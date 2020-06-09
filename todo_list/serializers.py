from rest_framework import serializers
from .models import TodoList
from datetime import datetime
from django.utils import timezone


class TodoListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )
    created_at = serializers.DateTimeField(default=datetime.now(tz=timezone.utc))

    def create(self, validated_data):
        return TodoList.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.owner = validated_data.get("owner", instance.owner)
        instance.created_at = validated_data.get("created_at", instance.created_at)
        instance.save()
        return instance
