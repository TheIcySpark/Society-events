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
from rest_framework.views import APIView
from rest_framework import status

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



class CreateUserAPIView(APIView):
    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)