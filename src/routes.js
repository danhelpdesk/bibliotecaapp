import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from './pages/home';

import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';

import LivroCad from './pages/livroCad';
import LivroList from './pages/livroList';

import EditoraCad from './pages/editoraCad';
import EditoraList from './pages/editoraList';

import AutorList from './pages/autorList';
import AutorCad from './pages/autorCad';

import EmprestimoList from './pages/emprestimoList';
import EmprestimoCad from './pages/emprestimoCad';

import EnderecoCad from './pages/enderecoCad';
import EnderecoList from './pages/enderecoList';

import ClienteList from './pages/clienteList';
import ClienteCad from './pages/clienteCad';
 

const Routes = createAppContainer(
    createDrawerNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                drawerLabel: "HOME"
            }
        },
        ListaEmprestimo: {
            screen: EmprestimoList,
            navigationOptions: {
                drawerLabel: "Lista de Emprestimos"
            }
        },
        ListaCliente: {
            screen: ClienteList,
            navigationOptions: {
                drawerLabel: "Lista de Clientes"
            }
        }, 
        ListaEndereco: {
            screen: EnderecoList,
            navigationOptions: {
                drawerLabel: "Lista de Endereços"
            }
        }, 
        ListaLivro:{
            screen:LivroList,
            navigationOptions:{
                drawerLabel:"Lista de Livros"
            }
        },  
        ListaGenero: {
            screen: GeneroList,
            navigationOptions: {
                drawerLabel: "Lista de Generos"
            }
        }, 
        ListaEditora: {
            screen: EditoraList,
            navigationOptions: {
                drawerLabel: "Lista de Editoras"
            }
        },  
        ListaAutor: {
            screen: AutorList,
            navigationOptions: {
                drawerLabel: "Lista de Autores"
            }
        },
        CadastroEmprestimo: {
            screen: EmprestimoCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Emprestimos"
            }
        },
        CadastroCliente: {
            screen: ClienteCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Clientes"
            }
        }, 
        CadastroEndereco: {
            screen: EnderecoCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Endereços"
            }
        },  
        CadastroLivro: {
            screen: LivroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Livros"
            }
        }, 
        CadastroGenero: {
            screen: GeneroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Generos"
            }
        },    
        CadastroEditora : {
            screen: EditoraCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Editoras"
            }
        },  
        CadastroAutor: {
            screen: AutorCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Autores"
            }
        },   
    })
);

export default Routes;