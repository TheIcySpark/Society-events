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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hello_world(request):
    return Response({"message": "Hello, World!"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def goodbye_world(request):
    return Response({"message": "Goodbye, World!"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_links(request):
    # Obteniendo las URLs utilizando reverse_lazy
    hello_url = reverse_lazy('hello-world')
    goodbye_url = reverse_lazy('goodbye-world')

    # Creando un diccionario con las URLs
    links = {
        "hello": str(request.build_absolute_uri(hello_url)),
        "goodbye": str(request.build_absolute_uri(goodbye_url)),
    }

    return Response(links)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Asegura que el usuario esté autenticado
def CommentView(request):
    # Obtener el ID de usuario del token automáticamente
    user_id = request.user.id

    # Crear el evento utilizando el ID de usuario obtenido
    event_data = {'user': user_id, 'title': request.data.get('title'), 'description': request.data.get('description')}
    serializer = CommentSerializer(data=event_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)