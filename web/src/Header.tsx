import React from 'react';

//Fazemos a interface para definir a tipagem
interface HeaderProps {
    title: string;
    // title?: string; - caso fosse opcional
};

//Apontamos que é um componente de função e recebe todas as propriedades
const Header: React.FC<HeaderProps> = (props) => {
    
    return (
        <header>{props.title}</header>
    );
}

export default Header;