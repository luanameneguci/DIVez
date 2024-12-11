import React from 'react';
import '../../App.css';  // Importa o arquivo de estilos CSS específico para esta página ou componente
import BudgetListBox from '../../components/admin/BudgetListBox';  // Importa o componente BudgetListBox localizado no diretório de componentes admin

// Define o número de linhas que serão exibidas na tabela
const numRowsToShow = 20;

// Componente funcional AdminBudgetList
const AdminBudgetList = () => {
    return (
        <div className="dashboard-content bg-light w-100">  {/* Div principal que envolve todo o conteúdo da página */}
            <h4 className="title my-2 mx-4">Budgets</h4>  {/* Título da página */}
            <div className="container">  {/* Container para organizar o conteúdo */}
                <div className="my-4">
                    {/* Renderiza o componente BudgetListBox, passando o número de linhas para mostrar como uma propriedade */}
                    <BudgetListBox numRowsToShow={numRowsToShow} />
                </div>
            </div>
        </div>
    );
}

export default AdminBudgetList;  // Exporta o componente AdminBudgetList para ser utilizado em outras partes da aplicação
