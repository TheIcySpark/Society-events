from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from society_events_app.models import *



class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
<<<<<<< HEAD
        fields = ['id', 'username', 'email']
=======
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        # Check if the email is unique
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate(self, data):
        """
        Check that the password is provided.
        """
        if 'password' not in data:
            raise serializers.ValidationError("Password is required")
        if 'email' not in data:
            raise serializers.ValidationError("Email is required")
        # You can add more validations here
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
>>>>>>> 8d5849614e7b3d3408c7760f6482e4c7d5a1997b


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Añadir información personalizada al token
        token['username'] = user.username
        # Agrega más campos según sea necesario

        return token
<<<<<<< HEAD


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        
class EventViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = ['participants', 'actual_participants', 'status']
=======
>>>>>>> 8d5849614e7b3d3408c7760f6482e4c7d5a1997b
