from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from society_events_app.models import Event, Comment
from django.utils.translation import gettext as _
from rest_framework.exceptions import ValidationError

class UsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
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
                return data

            raise serializers.ValidationError(
                "No se encontró un usuario con las credenciales proporcionadas.")
        else:
            raise serializers.ValidationError(
                "Se debe proporcionar tanto el nombre de usuario como la contraseña.")

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
        if 'username' not in data:
            raise ValidationError("Username is required")
        # You can add more validations here
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [ 'user', 'text', 'created_at']

    def get_user(self, comment):
        return comment.user.username if comment.user else None

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = ['participants', 'actual_participants', 'status']
