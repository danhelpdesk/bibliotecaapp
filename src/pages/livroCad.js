import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, Platform,}  
   from 'react-native';
import DatePicker from 'react-native-datepicker'
import api from '../services/api';
export default function LivroCad() {
    const [nome, setNome] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [valor, setValor] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [generos, setGeneros] = useState([]);
    const [idAutor, setIdAutor] = useState('');
    const [autores, setAutores] = useState([]);
    const [idEditora, setIdEditora] = useState('');
    const [editoras, setEditoras] = useState([]);

    function carregarCombos(){

        async function carregarGeneros() {
            const response = await api.get('/generos');
            setGeneros(response.data);
        }
        async function carregarAutores() {
            const response = await api.get('/autores');
            setAutores(response.data);
        }
        async function carregarEditoras() {
            const response = await api.get('/editoras');
            setEditoras(response.data);
        }
        carregarGeneros();
        carregarAutores();
        carregarEditoras();

    }
    
    async function handleSubmit() {
        try {
            
            const response = api.post('/livros', {
                nome,
                volume,
                valor,
                dataPublicacao,
                genero: {id : idGenero},
                autor: {id : idAutor},
                editora: {id : idEditora}
            });
            Alert.alert("Livro salvo com sucesso!");
            setNome('');
            setVolume('');
            setValor('');
            setDataPublicacao('');
            setIdGenero('');
            setIdAutor('');
            setIdEditora('');
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao realizar o cadastro, tente novamente!");
        }
    }
    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
            <Text style={styles.titulo}>Cadastro de livro</Text>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Nome do livro"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome}
                    onChange={carregarCombos} />
                <TextInput style={styles.input}
                    placeholder="Volume"
                    placeholderTextColor="#999"
                    value={volume}
                    onChangeText={setVolume}
                    keyboardType="numeric" />             
                <TextInput style={styles.input}
                    placeholder="Valor"
                    placeholderTextColor="#999"
                    value={valor}
                    onChangeText={setValor}
                    keyboardType="decimal-pad" />     
                <DatePicker style={{width: '100%'}}
                    date={dataPublicacao}
                    mode="date"
                    placeholder="Selecione a Data"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'relative',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 0
                    }
                    }} 
                    onDateChange={(date) => {setDataPublicacao(date)}}
                />
                
                <Picker selectedValue={idGenero}
                    onValueChange={setIdGenero}>
                    {
                        generos.map((genero) =>{
                            return <Picker.Item key={genero.id} 
                                label={genero.descricao}
                                value={genero.id} />
                        })
                    }
                </Picker> 

                <Picker selectedValue={idAutor}
                    onValueChange={setIdAutor}>
                    {
                        autores.map((autor) =>{
                            return <Picker.Item key={autor.id} 
                                label={autor.nome}
                                value={autor.id} />
                        })
                    }
                </Picker> 

                <Picker selectedValue={idEditora}
                    onValueChange={setIdEditora}>
                    {
                        editoras.map((editora) =>{
                            return <Picker.Item key={editora.id} 
                                label={editora.nome}
                                value={editora.id} />
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
