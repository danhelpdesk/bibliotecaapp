import React, { useState } from 'react';
import {View, Text, StyleSheet, DatePickerIOS,
    KeyboardAvoidingView, TextInput, TouchableOpacity, Alert, Picker, Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import api from '../services/api';
export default function EmprestimoCad() {
    const [dataEmprestimo, setDataEmprestimo] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [valorEmprestimo, setValorEmprestimo] = useState('');
    const [idLivro, setIdLivro] = useState('');
    const [livros, setLivros] = useState([]);

    async function carregarLivros() {
        const response = await api.get('/livros');
        setLivros(response.data);
    }

    carregarLivros();

    async function handleSubmit() {
        try {
            
            const response = api.post('/emprestimos', {
                dataEmprestimo,
                dataDevolucao,
                valorEmprestimo,
                livro: {id : idLivro},
            });
            Alert.alert("Emprestimo salvo com sucesso!");
            setDataEmprestimo(''),
            setDataDevolucao('');
            setValorEmprestimo('');
            setIdLivro('');
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao realizar o emprestimo, tente novamente!");
        }
    }
    return(
        <KeyboardAvoidingView enabled={Platform.OS == 'ios'}
            behavior="padding" style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Emprestimo</Text>
            <View style={styles.form}>
            <DatePicker style={{width: '100%'}}
                    date={dataEmprestimo}
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
                    onDateChange={(date) => {setDataEmprestimo(date)}}
                />  

                <DatePicker style={{width: '100%'}}
                    date={dataDevolucao}
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
                    onDateChange={(date) => {setDataDevolucao(date)}}
                />     

                <TextInput style={styles.input}
                    placeholder="Valor do emprestimo"
                    placeholderTextColor="#999"
                    value={valorEmprestimo}
                    onChangeText={setValorEmprestimo}
                    keyboardType="decimal-pad" />  
                       
                <Picker selectedValue={idLivro}
                    onValueChange={setIdLivro}>
                    {
                        livros.map((livro) =>{
                            return <Picker.Item key={livro.id} 
                                label={livro.nome}
                                value={livro.id} />
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
