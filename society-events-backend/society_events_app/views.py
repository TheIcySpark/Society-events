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
            'event': request.data.get('event'),  # Asegúrate de que 'event' esté presente en los datos del request
            'user': user_id,
            'text': request.data.get('text'),  # Asegúrate de que 'text' esté presente en los datos del request
        }

        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    if request.method == 'POST':
        # Crear una copia mutable de request.data
        mutable_data = request.data.copy()
        
        # Obtener el usuario actual a partir del token
        creator = request.user

        # Agregar el ID del creador al objeto de datos
        mutable_data['creator'] = creator.id

        serializer = EventSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)