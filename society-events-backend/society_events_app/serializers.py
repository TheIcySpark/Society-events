from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from society_events_app.models import Event, Comment
from django.utils.translation import gettext as _
from rest_framework.exceptions import ValidationError


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
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
                    'user_id': user.id,  # Include user_id in the response if needed
                    'username': user.username,  # Include username in the response if needed
                    'email': user.email,  # Include email in the response if needed
                }
                return data

            raise serializers.ValidationError(
                "No se encontró un usuario con las credenciales proporcionadas.")
        else:
            raise serializers.ValidationError(
                "Se debe proporcionar tanto el correo electrónico como la contraseña.")


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, required=True, style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        # Check if the email is unique
        if User.objects.filter(email=value).exists():
            raise ValidationError("A user with that email already exists.")
        return value

    def validate(self, data):
        """
        Check that the password is provided.
        """
        if 'password' not in data:
            raise ValidationError("Password is required")
        if 'email' not in data:
            raise ValidationError("Email is required")
        # You can add more validations here
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def validate_email(self, value):
        # Check if the email is unique
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists.")
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
        # Add custom information to the token
        token['username'] = user.username
        # Add more fields as needed
        return token


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
