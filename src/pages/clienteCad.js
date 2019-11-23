import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import { Platform } from '@unimodules/core';
import api from '../services/api';
export default function ClienteCad() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [sexo, setSexo] = useState('');
    const [idEndereco, SetIdEndereco] = useState('');
    const [enderecos, setEnderecos] = useState([]);

    async function carregarEnderecos() {
        const response = await api.get('/enderecos');
        setEnderecos(response.data);
    }

    carregarEnderecos();

    async function handleSubmit() {  
        try {
            const response = await api.post('/clientes', 
        {
            nome,
            cpf,
            email,
            telefone,
            sexo,
            endereco: {id : idEndereco},
        });

        Alert.alert("Cliente salvo com sucesso!");
            setNome('');
            setCpf('');
            setEmail('');
            setTelefone('');
            setSexo('');
            SetIdEndereco('')

        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao cadastrar cliente, tente novamente!');
        }
       
    }
    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Clientes</Text>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome} />
                <TextInput style={styles.input}
                    placeholder="Cpf"
                    placeholderTextColor="#999"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric" />            
                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail} />   
                <TextInput style={styles.input}
                    placeholder="Telefone"
                    placeholderTextColor="#999"
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="numeric" />
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
                <Picker selectedValue={idEndereco}
                    onValueChange={SetIdEndereco}>
                    {
                        enderecos.map((endereco) =>{
                            return <Picker.Item key={endereco.id} 
                                label={endereco.rua}
                                value={endereco.id} />
                        })
                    }
                </Picker> 
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
    titulo : {
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
