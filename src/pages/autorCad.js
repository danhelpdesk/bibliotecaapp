import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { Platform } from '@unimodules/core';
import api from '../services/api';
export default function AutorCad() {
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    async function handleSubmit() {
        try {
            const response = await api.post('/autores',
                {
                    nome,
                    sexo
                });
            Alert.alert('Autor salvo com sucesso!');
            setNome('');
            setSexo('');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao cadastrar autor, tente novamente"');
        }
    }
    return (
        <KeyboardAvoidingView
            enabled={Platform.OS == 'ios'}
            behavior="padding"
            style={styles.container} >
            <View style={styles.form}>
                <Text style={styles.titulo}>Cadastro de Autor</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do Autor"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />
                <View style={styles.dataView}>
                    <Text style={styles.labelPicker}>Sexo:</Text>
                    <Picker selectedValue={sexo}
                        onValueChange={setSexo}
                        style={styles.flexPicker}>
                        <Picker.Item label='Selecione' value='' />
                        <Picker.Item label='Feminino' value='FEMININO' />
                        <Picker.Item label='Masculino' value='MASCULINO' />
                       
                    </Picker>
                </View>
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#FFFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    botao: {
        height: 42,
        backgroundColor: '#008000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});
