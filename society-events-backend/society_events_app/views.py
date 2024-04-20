from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer  # No .serializers.UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.urls import reverse_lazy
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from society_events_app.models import *
from society_events_app.serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    data = {'message': 'Welcome to the API!'}
    return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CommentView(request):
    if request.method == 'POST':
        # Obtener el ID de usuario del token JWT
        user_id = request.user.id

        # Crear un diccionario con los datos del request y agregar el user_id
        data = {
            # Asegúrate de que 'event' esté presente en los datos del request
            'event': request.data.get('event'),
            'user': user_id,
            # Asegúrate de que 'text' esté presente en los datos del request
            'text': request.data.get('text'),
        }

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def create_event(request):
    if request.method == 'POST':
        # Crear una copia mutable de request.data
        mutable_data = request.data.copy()

        # Formatea la fecha de inicio y finalización y muestra los datos recibidos
        start_date = parse_datetime(mutable_data.get('start_date'))
        end_date = parse_datetime(mutable_data.get('end_date'))

        # Convierte las fechas al formato deseado sin hacerlas "aware"
        mutable_data['start_date'] = start_date.strftime('%Y-%m-%d %H:%M:%S')
        mutable_data['end_date'] = end_date.strftime('%Y-%m-%d %H:%M:%S')

        # Asigna el valor 'Gato' a creator
        mutable_data['creator'] = 1

        # Imprime los datos recibidos en la consola de Django
        print('Datos recibidos:', mutable_data)

        serializer = EventSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
