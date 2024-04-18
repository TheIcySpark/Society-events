from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Añadir información personalizada al token
        token['username'] = user.username
        # Agrega más campos según sea necesario

        return token
