import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';

const AutoLogout = () => {
  const { handleLogout } = useAuth();

  useEffect(() => {
    let inactivityTimeout;

    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);

      // Defina o tempo limite de inatividade em milissegundos (por exemplo, 15 minutos)
      const inactivityLimit = 30 * 60 * 1000;

      inactivityTimeout = setTimeout(() => {
        // Chame a função de logout após o tempo limite de inatividade
        handleLogout();
      }, inactivityLimit);
    };

    const handleUserActivity = () => {
      // Registre a última atividade do usuário
      resetInactivityTimeout();
    };


    // Adicione ouvintes para eventos de atividade do usuário
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);


    // Inicialize o temporizador de inatividade
    resetInactivityTimeout();

    // Remova ouvintes de eventos ao desmontar o componente
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      clearTimeout(inactivityTimeout);
    };
  }, [handleLogout]);

  return null;
};

export { AutoLogout };

