from django import forms

class PostFilterForm(forms.Form):
    CHOICES = (
        ('User', 'user'),
        ('Topic', 'topic'),
    )
    model = forms.ChoiceField(label='Model', choices=CHOICES, widget=forms.Select)
    id = forms.IntegerField(label='Model id')
