# Generated by Django 3.0.7 on 2020-06-20 00:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("todo_lists", "0003_auto_20200619_2343"),
    ]

    operations = [
        migrations.RemoveField(model_name="todo", name="created_at",),
    ]
