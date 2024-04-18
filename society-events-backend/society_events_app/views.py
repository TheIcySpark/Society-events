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
<<<<<<< HEAD
from rest_framework import status
from society_events_app.models import *
from society_events_app.serializers import *
from django.shortcuts import get_object_or_404

=======
from rest_framework.views import APIView
from rest_framework import status
>>>>>>> 8d5849614e7b3d3408c7760f6482e4c7d5a1997b

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
<<<<<<< HEAD
def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    serializer = EventSerializer(event)
    return Response(serializer.data)
=======
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



class CreateUserAPIView(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
>>>>>>> 8d5849614e7b3d3408c7760f6482e4c7d5a1997b
