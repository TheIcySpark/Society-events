from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.utils.dateparse import parse_datetime
from rest_framework.permissions import IsAuthenticated
from society_events_app.models import Comment, Event
from society_events_app.serializers import (
    UserSerializer,
    CommentSerializer,
    EventSerializer,
    EventViewSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import *
from rest_framework.exceptions import AuthenticationFailed


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print("Datos de la solicitud:", request.data)
        return super().post(request, *args, **kwargs)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = User.objects.filter(email=email).first()

            if user and user.check_password(password):
                refresh = self.get_token(user)
                data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.id,
                    'email': user.email,
                }
                return data

            raise AuthenticationFailed(
                "No se encontró un usuario con las credenciales proporcionadas.")
        else:
            raise AuthenticationFailed(
                "Se debe proporcionar tanto el correo electrónico como la contraseña.")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    data = {'message': 'Welcome to the API!'}
    return Response(data)


@api_view(['POST'])
def CommentView(request):
    if request.method == 'POST':
        data = {
            'event': 2,
            'user': 1,
            'text': request.data.get('text'),
        }
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_event(request):
    if request.method == 'POST':
        mutable_data = request.data.copy()
        start_date = parse_datetime(mutable_data.get('start_date'))
        end_date = parse_datetime(mutable_data.get('end_date'))
        mutable_data['start_date'] = start_date.strftime('%Y-%m-%d %H:%M:%S')
        mutable_data['end_date'] = end_date.strftime('%Y-%m-%d %H:%M:%S')
        mutable_data['creator'] = 1
        serializer = EventSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def comment_list(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventViewSerializer(events, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    serializer = EventSerializer(event)
    return Response(serializer.data)


class CreateUserAPIView(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
