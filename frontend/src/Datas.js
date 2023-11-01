//dados mocados

export const eventos = [
    {
      id: 1,
      titulo: 'TITULO 1',
      foto: 'https://picsum.photos/300/200?random=1',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci eros, facilisis non metus vitae, venenatis fermentum turpis. Ut quis vehicula dolor.',
      pix: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      listaDeConvidados: [
        'Convidado 1',
        'Convidado 2',
        'Convidado 3',
      ],
      listaDeGastos: [
        {
          local: 'Restaurante',
          descricao: 'Jantar com os convidados',
          valor: 100.00,
        },
        {
          local: 'Decoração',
          descricao: 'Compra de flores e enfeites',
          valor: 50.00,
        },
      ],
    },
    {
      id: 2,
      titulo: 'TITULO 2',
      foto: 'https://picsum.photos/300/200?random=2',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci eros, facilisis non metus vitae, venenatis fermentum turpis. Ut quis vehicula dolor.',
      pix: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      listaDeConvidados: [
        'Convidado 4',
        'Convidado 5',
        'Convidado 6',
      ],
      listaDeGastos: [
        {
          local: 'Lanchonete',
          descricao: 'Lanche rápido',
          valor: 20.00,
        },
        {
          local: 'Presente de aniversário',
          descricao: 'Compra de presente',
          valor: 30.00,
        },
      ],
    },
    {
      id: 3,
      titulo: 'TITULO 3',
      foto: 'https://picsum.photos/300/200?random=3',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci eros, facilisis non metus vitae, venenatis fermentum turpis. Ut quis vehicula dolor.',
      pix: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      listaDeConvidados: [
        'Convidado 7',
        'Convidado 8',
        'Convidado 9',
      ],
      listaDeGastos: [
        {
          local: 'Parque',
          descricao: 'Passeio no parque',
          valor: 10.00,
        },
        {
          local: 'Livraria',
          descricao: 'Compra de livros',
          valor: 40.00,
        },
      ],
    },
    {
      id: 4,
      titulo: 'TITULO 4',
      foto: 'https://picsum.photos/300/200?random=4',
      descricao: 'Descrição do evento 4',
      pix: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      listaDeConvidados: [
        'Convidado 10',
        'Convidado 11',
        'Convidado 12',
      ],
      listaDeGastos: [
        {
          local: 'Cinema',
          descricao: 'Ingressos de cinema',
          valor: 25.00,
        },
        {
          local: 'Restaurante',
          descricao: 'Almoço com amigos',
          valor: 60.00,
        },
      ],
    },
    {
      id: 5,
      titulo: 'TITULO 5',
      foto: 'https://picsum.photos/300/200?random=5',
      descricao: 'Descrição do evento 5',
      pix: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      listaDeConvidados: [
        'Convidado 13',
        'Convidado 14',
        'Convidado 15',
      ],
      listaDeGastos: [
        {
          local: 'Praia',
          descricao: 'Dia na praia',
          valor: 30.00,
        },
        {
          local: 'Supermercado',
          descricao: 'Compras para churrasco',
          valor: 70.00,
        },
      ],
    },
  ];
  
  export const usuarios = [
    {
      nome: 'Maria',
      sobrenome: 'Silva',
      username: 'maria_silva',
      id: '12345',
      listaDeEventos: [1, 2, 3],
      senha: 'senha123',
    },
    {
      nome: 'João',
      sobrenome: 'Oliveira',
      username: 'joao_oliveira',
      id: '54321',
      listaDeEventos: [2, 4, 5],
      senha: 'senha456',
    },
    {
      nome: 'Ana',
      sobrenome: 'Pereira',
      username: 'ana_pereira',
      id: '78901',
      listaDeEventos: [3, 5],
      senha: 'senha789',
    },
    {
      nome: 'Pedro',
      sobrenome: 'Santos',
      username: 'pedro_santos',
      id: '13579',
      listaDeEventos: [1, 3],
      senha: 'senhaabc',
    },
  ];
  