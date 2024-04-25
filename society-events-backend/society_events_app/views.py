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
    UsernameTokenObtainPairSerializer,  # Corregido el nombre de la importación
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import *
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.exceptions import NotFound, PermissionDenied
from society_events_app.models import Event
from society_events_app.serializers import EventSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = UsernameTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print("Datos de la solicitud:", request.data)
        response = super().post(request, *args, **kwargs)
        print("Datos de la respuesta:", response.data)
        access_token = response.data.get('access')
        print("Token de acceso:", access_token)
        return response



def validate(self, attrs):
    username = attrs.get('username')
    password = attrs.get('password')

    if username and password:
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            refresh = self.get_token(user)
            data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id,
                'username': user.username,
            }
            # Agregar este print para ver los datos del token
            print("Datos del token:", data)
            return data

        raise AuthenticationFailed(
            "No se encontró un usuario con las credenciales proporcionadas.")
    else:
        raise AuthenticationFailed(
            "Se debe proporcionar tanto el nombre de usuario como la contraseña.")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    data = {'message': 'Welcome to the API!'}
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CommentView(request):
    if request.method == 'POST':
        data = {
            'event': request.data.get('event'),
            'user': request.data.get('user'),
            'text': request.data.get('text'),
        }
        # Agregar este print para verificar los datos
        print("Datos recibidos en CommentView:", data)
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Agregar este print para ver los errores de validación
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    if request.method == 'POST':
        mutable_data = request.data.copy()
        start_date = parse_datetime(mutable_data.get('start_date'))
        end_date = parse_datetime(mutable_data.get('end_date'))
        mutable_data['start_date'] = start_date.strftime('%Y-%m-%d %H:%M:%S')
        mutable_data['end_date'] = end_date.strftime('%Y-%m-%d %H:%M:%S')
        # Aquí puedes establecer el ID del usuario creador
        mutable_data['creator'] = 1
        serializer = EventSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comment_list(request):
    if request.method == 'GET':
        # Obtener el ID del evento de la URL
        event_id = request.GET.get('event_id')
        comments = Comment.objects.filter(event_id=event_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def event_list(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventViewSerializer(events, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        raise NotFound("Event not found")
    except Exception as e:
        raise PermissionDenied(str(e))


class CreateUserAPIView(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
