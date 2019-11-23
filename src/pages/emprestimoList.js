import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../services/api';
export default function EmprestimoList() {
    const [emprestimos, setEmprestimos] = useState([]);
    async function carregarEmprestimos() {
        const response = await api.get('/emprestimos');
        setEmprestimos(response.data);
    }
    carregarEmprestimos();
    return(
        <View style={styles.container}>
           <Text style={styles.titulo}>Lista de Emprestimos</Text>
           <FlatList data={emprestimos} 
             style={styles.lista}
             keyExtractor={emprestimo => `${emprestimo.id}`}
             renderItem={({item}) => (
                 <View style={styles.container}>
                   <View style={styles.card}>
                     <Text style={styles.label} >Id: {item.id}</Text>
                     <Text style={styles.label}>DataEmprestimo: {item.dataEmprestimo}</Text>
                     <Text style={styles.label}>DataDevolucao: {item.dataDevolucap}</Text>
                     <Text style={styles.label}>ValorEmprestimo: {item.valorEmprestimo}</Text>
                     <Text style={styles.label}>Livro: {item.livro.nome}</Text>
                     <TouchableOpacity onPress={ async () => {
                         const id = item.id;
                         await api.delete(`/emprestimos/${id}`);
                     }}>
                         <Text style={styles.botaoTexto}>Excluir</Text>
                     </TouchableOpacity>
                   </View>
                 </View>
             ) }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#696969',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    lista: {
        paddingHorizontal: 20
    },
    titulo: {
        fontSize: 18,
        marginTop: 30,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444'
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10
    },
    botaoTexto: {
        color: '#f05a5b',
        fontWeight: 'bold',
        fontSize: 16
    }
});  