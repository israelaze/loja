create table clientes (id_cliente serial not null, cpf varchar(14) not null, data_nascimento date, email varchar(60), foto oid, nome varchar(60) not null, observacao TEXT, telefone1 varchar(15) not null, telefone2 varchar(15), id_endereco integer, primary key (id_cliente));
create table enderecos (id_endereco serial not null, bairro varchar(60), cep varchar(9), complemento varchar(60), condominio varchar(60), estado varchar(255), logradouro varchar(60), municipio varchar(60), numero varchar(10), primary key (id_endereco));
create table fornecedores (id_fornecedor serial not null, cpf_cnpj varchar(20) not null, email varchar(60), nome_fornecedor varchar(100) not null, telefone1 varchar(15) not null, telefone2 varchar(15), id_endereco integer, primary key (id_fornecedor));
create table item_pedido (preco float(53), quantidade integer, pedido_id integer not null, produto_id integer not null, primary key (pedido_id, produto_id));
create table pedidos (id_pedido serial not null, data_entrega date, data_pedido date not null, desconto float(53), numero_pedido varchar(10) not null, situacao varchar(255), total float(53), id_cliente integer not null, id_vendedor integer not null, primary key (id_pedido));
create table produtos (id_produto serial not null, ativo boolean not null, categoria varchar(255), codigo varchar(15) not null, data_cadastro date, descricao varchar(255), foto oid, margem_lucro float(53), nome_produto varchar(50) not null, peso float(53), tipo_peso varchar(255), valor_custo float(53), valor_venda float(53), id_fornecedor integer not null, primary key (id_produto));
create table usuarios (id_usuario serial not null, email varchar(50) not null, nome varchar(20) not null, perfil varchar(255) not null, senha varchar(100) not null, sobre_nome varchar(50) not null, primary key (id_usuario));
create table vendedores (id_vendedor serial not null, apelido varchar(50), nome varchar(100) not null, primary key (id_vendedor));
alter table if exists clientes add constraint UK_7wflw78ibh162cmq12ii6ffly unique (cpf);
alter table if exists fornecedores add constraint UK_cawt78v9v2arp5g3o5xmwxn3c unique (cpf_cnpj);
alter table if exists fornecedores add constraint UK_sl3bb6agawwkftrxiem5n8nyu unique (email);
alter table if exists fornecedores add constraint UK_5a0dp5lpww69oi56fl9efj0r5 unique (telefone1);
alter table if exists fornecedores add constraint UK_m8r3257lfy5pic7eviast3g3h unique (telefone2);
alter table if exists fornecedores add constraint UK_20ph4e2u1wjnqmwtyw0fhorvl unique (id_endereco);
alter table if exists pedidos add constraint UK_6ywv5771tibn93splh6t3ft06 unique (numero_pedido);
alter table if exists produtos add constraint UK_pk2k37y05kgqceufn556j55w3 unique (codigo);
alter table if exists usuarios add constraint UK_kfsp0s1tflm1cwlj8idhqsad0 unique (email);
alter table if exists clientes add constraint FKmcsl2xyk2sepb45sgmwgvh68q foreign key (id_endereco) references enderecos;
alter table if exists fornecedores add constraint FKk2ys7y9ysiip19p37dgo0xhfx foreign key (id_endereco) references enderecos;
alter table if exists item_pedido add constraint FKq6cx2t1dh4ikg93nvlpumswxx foreign key (pedido_id) references pedidos;
alter table if exists item_pedido add constraint FKmo38jw38syue22kf17cbggmv0 foreign key (produto_id) references produtos;
alter table if exists pedidos add constraint FKdnomiluem4t3x66t6b9aher47 foreign key (id_cliente) references clientes;
alter table if exists pedidos add constraint FKp8rvbnjy31tbbb2yr7yn0sqml foreign key (id_vendedor) references vendedores;
alter table if exists produtos add constraint FK79y6qv8omay7uau8ywjfn4k0b foreign key (id_fornecedor) references fornecedores;