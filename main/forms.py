from django import forms


class NewNode(forms.Form):
    image = forms.ImageField(label='Image')
    text = forms.CharField(label ='Placeholder', max_length=100)
