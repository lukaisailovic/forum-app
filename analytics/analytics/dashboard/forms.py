from django import forms
from django.forms import ModelForm
from .models import Board

class PostFilterForm(forms.Form):
    CHOICES = (
        ('User', 'user'),
        ('Topic', 'topic'),
    )
    model = forms.ChoiceField(label='Model', choices=CHOICES, widget=forms.Select)
    id = forms.IntegerField(label='Model id')

class BoardForm(ModelForm):
    class Meta:
        model = Board
        fields = [ 'name','description']
