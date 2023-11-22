import React from 'react';
import Modal from 'react-modal';
import { FindUserByID } from '../../services/userServices';
import { useState, useEffect } from 'react';
import Perfil from './Perfil';

export default function UserDrawer({ isOpen, onClose, userId }){
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userFound = await FindUserByID(userId);
            setUserData(userFound);
          } catch (error) {
            console.error('Erro ao buscar informações do usuário:', error);
          }
        };
    if (isOpen && userId) {
        fetchUserData();
        }
    }, [isOpen, userId]);  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="User Drawer"
      >
        <Perfil img = {userData.imagem}/>
        <h2>Informações do Usuário</h2>
        {userData && (
        <div>
          {Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      )}
      </Modal>
    );
  };