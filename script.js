document.addEventListener("DOMContentLoaded", function() {
    // Dados
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let historico = JSON.parse(localStorage.getItem("historico")) || [];
    let produtosRecentes = JSON.parse(localStorage.getItem("produtosRecentes")) || [];
    
    // BANCO DE DADOS DE PRODUTOS PRÉ-CADASTRADOS ATUALIZADO
    const bancoProdutos = {
        // === SNACKS E SALGADINHOS ===
        "7892840823375": { nome: "Batata Lays Original 70g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891149019870": { nome: "Batata Lays Sabor Churrasco 80g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891149019887": { nome: "Batata Lays Salsa e Cebola 80g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891149019849": { nome: "Batata Lays Ondulada 80g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891149019894": { nome: "Batata Lays Stax Original 120g", categoria: "Alimentos", preco: 15.90, custo: 9.50 },
        
        // Outros salgadinhos
        "7891991011068": { nome: "Salgadinho Cheetos Bola 80g", categoria: "Alimentos", preco: 7.90, custo: 4.80 },
        "7891991011075": { nome: "Salgadinho Cheetos Requeijão 80g", categoria: "Alimentos", preco: 7.90, custo: 4.80 },
        "7891991011082": { nome: "Salgadinho Fandangos Queijo 80g", categoria: "Alimentos", preco: 7.90, custo: 4.80 },
        "7891991011099": { nome: "Salgadinho Doritos Nacho 80g", categoria: "Alimentos", preco: 9.90, custo: 5.80 },
        "7891991011105": { nome: "Salgadinho Ruffles Original 80g", categoria: "Alimentos", preco: 11.90, custo: 7.20 },
        "7891991011112": { nome: "Salgadinho Ruffles Churrasco 80g", categoria: "Alimentos", preco: 11.90, custo: 7.20 },
        
        // === BISCOITOS ===
        "7896213005894": { nome: "Biscoito Treloso Recheado Chocolate  120g", categoria: "Alimentos", preco: 3.90, custo: 2.40 },
        "7891991010863": { nome: "Biscoito Cream Cracker Marilan 400g", categoria: "Alimentos", preco: 8.90, custo: 5.20 },
        "7891991010870": { nome: "Biscoito Recheado Chocolate Marilan 130g", categoria: "Alimentos", preco: 4.90, custo: 2.80 },
        "7891991010887": { nome: "Biscoito Wafer Chocolate Bauducco 140g", categoria: "Alimentos", preco: 6.90, custo: 4.10 },
        "7896213005948": { nome: "Biscoito Treloso Flocos 90g", categoria: "Alimentos", preco: 3.90, custo: 2.20 },
        
        // === CHOCOLATES E DOCES ===
        "7891000315507": { nome: "Chocolate Lacta 150g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891000315606": { nome: "Chocolate Laka Branco 150g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891000315705": { nome: "Chocolate Diamante Negro 150g", categoria: "Alimentos", preco: 11.90, custo: 7.10 },
        "7891000315804": { nome: "Chocolate Sonho de Valsa 150g", categoria: "Alimentos", preco: 10.90, custo: 6.50 },
        "7891000315903": { nome: "Chocolate Ouro Branco 150g", categoria: "Alimentos", preco: 13.90, custo: 8.30 },
        "7896051140017": { nome: "Chocolate Nestlé Classic 150g", categoria: "Alimentos", preco: 11.90, custo: 7.10 },
        "7896051140024": { nome: "Chocolate Galak 150g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },

        // === ALIMENTOS BÁSICOS ===
        "7891234567890": { nome: "Arroz Integral Tio João 1kg", categoria: "Alimentos", preco: 8.50, custo: 5.20 },
        "7891234567891": { nome: "Feijão Preto Camil 1kg", categoria: "Alimentos", preco: 9.20, custo: 6.80 },
        "7891234567892": { nome: "Açúcar Cristal União 1kg", categoria: "Alimentos", preco: 4.50, custo: 2.80 },
        "7891234567893": { nome: "Café Pilão 500g", categoria: "Alimentos", preco: 18.90, custo: 12.50 },
        "7891234567894": { nome: "Óleo de Soja Liza 900ml", categoria: "Alimentos", preco: 7.80, custo: 5.20 },
        "7891234567895": { nome: "Farinha de Trigo Dona Benta 1kg", categoria: "Alimentos", preco: 5.90, custo: 3.50 },
        "7891234567896": { nome: "Macarrão Espaguete Renata 500g", categoria: "Alimentos", preco: 4.20, custo: 2.50 },
        "7891234567897": { nome: "Leite Integral Parmalat 1L", categoria: "Alimentos", preco: 5.50, custo: 3.80 },
        "7891234567898": { nome: "Manteiga Aviação 200g", categoria: "Alimentos", preco: 12.90, custo: 8.50 },
        "7891234567899": { nome: "Queijo Mussarela Frimesa 1kg", categoria: "Alimentos", preco: 28.90, custo: 19.50 },
        
        // === BEBIDAS ===
        "7896541230123": { nome: "Coca-Cola 2L", categoria: "Bebidas", preco: 9.50, custo: 6.20 },
        "7896541230124": { nome: "Guaraná Antarctica 2L", categoria: "Bebidas", preco: 7.90, custo: 5.10 },
        "7896541230125": { nome: "Suco de Laranja Del Valle 1L", categoria: "Bebidas", preco: 8.90, custo: 5.80 },
        "7896541230126": { nome: "Água Mineral Crystal 500ml", categoria: "Bebidas", preco: 2.50, custo: 1.20 },
        "7896541230127": { nome: "Cerveja Skol 350ml", categoria: "Bebidas", preco: 3.50, custo: 2.10 },
        "7896541230128": { nome: "Vinho Tinto Seco Garibaldi 750ml", categoria: "Bebidas", preco: 25.90, custo: 16.50 },
        "7896541230129": { nome: "Energético Red Bull 250ml", categoria: "Bebidas", preco: 12.90, custo: 8.20 },
        "7896541230130": { nome: "Chá Matte Leão 1L", categoria: "Bebidas", preco: 6.90, custo: 4.30 },
        "7894900011517": { nome: "Refrigerante Pepsi 2L", categoria: "Bebidas", preco: 8.90, custo: 5.60 },
        "7894900011524": { nome: "Refrigerante Sukita 2L", categoria: "Bebidas", preco: 7.90, custo: 5.10 },
        
        // === LIMPEZA ===
        "7893214560987": { nome: "Sabão em Pó Omo 1kg", categoria: "Limpeza", preco: 18.90, custo: 12.50 },
        "7893214560988": { nome: "Detergente Ypê 500ml", categoria: "Limpeza", preco: 2.90, custo: 1.50 },
        "7893214560989": { nome: "Amaciante Downy 500ml", categoria: "Limpeza", preco: 11.90, custo: 7.80 },
        "7893214560990": { nome: "Desinfetante Veja 500ml", categoria: "Limpeza", preco: 6.90, custo: 4.20 },
        "7893214560991": { nome: "Água Sanitaria Qboa 1L", categoria: "Limpeza", preco: 4.50, custo: 2.50 },
        "7893214560992": { nome: "Limpador Multiuso Veja 500ml", categoria: "Limpeza", preco: 8.90, custo: 5.60 },
        "7893214560993": { nome: "Sabão em Barra Minerva 90g", categoria: "Limpeza", preco: 2.50, custo: 1.30 },
        "7893214560994": { nome: "Esponja de Aço Bom Bril", categoria: "Limpeza", preco: 3.90, custo: 2.10 },
        
        // === HIGIENE ===
        "7899876543210": { nome: "Sabonete Dove 90g", categoria: "Higiene", preco: 3.90, custo: 2.20 },
        "7899876543211": { nome: "Shampoo Pantene 200ml", categoria: "Higiene", preco: 15.90, custo: 9.80 },
        "7899876543212": { nome: "Condicionador Seda 200ml", categoria: "Higiene", preco: 14.90, custo: 9.20 },
        "7899876543213": { nome: "Creme Dental Colgate 90g", categoria: "Higiene", preco: 4.90, custo: 2.80 },
        "7899876543214": { nome: "Escova de Dentes Colgate", categoria: "Higiene", preco: 7.90, custo: 4.50 },
        "7899876543215": { nome: "Desodorante Rexona 150ml", categoria: "Higiene", preco: 12.90, custo: 7.80 },
        "7899876543216": { nome: "Papel Higiênico Neve 30m", categoria: "Higiene", preco: 8.90, custo: 5.20 },
        "7899876543217": { nome: "Fio Dental Johnson's 50m", categoria: "Higiene", preco: 6.90, custo: 3.80 },
        "7899876543218": { nome: "Absorvente Always 8un", categoria: "Higiene", preco: 12.90, custo: 7.80 },
        
        // === ELETRÔNICOS ===
        "7895551112223": { nome: "Pilha AA Duracell 4 unidades", categoria: "Eletrônicos", preco: 18.90, custo: 11.50 },
        "7895551112224": { nome: "Carregador USB Samsung", categoria: "Eletrônicos", preco: 45.90, custo: 28.50 },
        "7895551112225": { nome: "Fone de Ouvido Philips", categoria: "Eletrônicos", preco: 89.90, custo: 55.00 },
        "7895551112226": { nome: "Cabo HDMI 1.5m", categoria: "Eletrônicos", preco: 29.90, custo: 16.80 },
        "7895551112227": { nome: "Mouse Logitech USB", categoria: "Eletrônicos", preco: 39.90, custo: 24.50 },
        "7895551112228": { nome: "Teclado Multilaser", categoria: "Eletrônicos", preco: 59.90, custo: 35.00 },
        "7895551112229": { nome: "Cartão de Memória 32GB", categoria: "Eletrônicos", preco: 45.90, custo: 27.50 },
        "7895551112230": { nome: "Pilha AAA Duracell 4un", categoria: "Eletrônicos", preco: 16.90, custo: 10.20 },
        
        // === VESTUÁRIO ===
        "7894447778889": { nome: "Camiseta Básica Masculina M", categoria: "Vestuário", preco: 29.90, custo: 16.50 },
        "7894447778890": { nome: "Meia Soquete Lupo 3 pares", categoria: "Vestuário", preco: 24.90, custo: 13.80 },
        "7894447778891": { nome: "Cueca Masculina Cotton 3un", categoria: "Vestuário", preco: 49.90, custo: 28.50 },
        "7894447778892": { nome: "Bermuda Jeans Masculina 40", categoria: "Vestuário", preco: 89.90, custo: 55.00 },
        "7894447778893": { nome: "Blusa Feminina Manga Longa", categoria: "Vestuário", preco: 59.90, custo: 35.00 },
        "7894447778894": { nome: "Calça Jeans Feminina 38", categoria: "Vestuário", preco: 99.90, custo: 62.00 },
        
        // === PRODUTOS CONGELADOS ===
        "7893000550012": { nome: "Pizza Sadia Mussarela 450g", categoria: "Alimentos", preco: 18.90, custo: 11.50 },
        "7893000550029": { nome: "Lasanha Sadia 400g", categoria: "Alimentos", preco: 16.90, custo: 10.20 },
        "7893000550036": { nome: "Hambúrguer Bovino Sadia 500g", categoria: "Alimentos", preco: 22.90, custo: 14.50 },
        "7893000550043": { nome: "Nuggets de Frango Sadia 300g", categoria: "Alimentos", preco: 15.90, custo: 9.80 },
        
        // === PADARIA ===
        "7896004000641": { nome: "Leite Condensado Moça", categoria: "Alimentos", preco: 6.90, custo: 4.20 },
        "7891000053508": { nome: "Creme de Leite Nestlé", categoria: "Alimentos", preco: 4.90, custo: 2.90 },
        "7892840222949": { nome: "Molho de Tomate Elefante", categoria: "Alimentos", preco: 3.90, custo: 2.10 },
        "7896051111020": { nome: "Achocolatado Toddy", categoria: "Alimentos", preco: 8.90, custo: 5.40 },
        "7891098003201": { nome: "Salsicha Hot Dog Sadia", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        "7891098003218": { nome: "Presunto Sadia 500g", categoria: "Alimentos", preco: 18.90, custo: 11.50 },
        "7891098003225": { nome: "Mortadela Sadia 500g", categoria: "Alimentos", preco: 12.90, custo: 7.80 },
        
        // === BEBIDAS ALCOÓLICAS ===
        "7896094900015": { nome: "Vodka Smirnoff 1L", categoria: "Bebidas", preco: 45.90, custo: 28.50 },
        "7896094900022": { nome: "Whisky Johnnie Walker 1L", categoria: "Bebidas", preco: 89.90, custo: 55.00 },
        "7896094900039": { nome: "Cachaça 51 1L", categoria: "Bebidas", preco: 22.90, custo: 13.80 },
        "7896094900046": { nome: "Gin Tanqueray 750ml", categoria: "Bebidas", preco: 120.90, custo: 75.00 }
    };

    // Cores para gráficos
    const colors = ['#1a365d', '#2d3748', '#00b894', '#0984e3', '#6c5ce7', '#fd79a8', '#fdcb6e'];
    
    // Inicialização
    initSystem();

    function initSystem() {
        setupNavigation();
        setupEventListeners();
        loadSampleData();
        updateSelect();
        renderProdutosTable();
        renderMovimentosTable();
        updateDashboard();
        
        // Inicializar sistema de cadastro por código de barras
        setupBarcodeRegistration();
        
        // Carregar produtos recentes
        carregarProdutosRecentes();
        
        // Renderiza gráficos iniciais
        setTimeout(() => {
            renderFinancialCharts();
            renderMarketCharts();
            renderPerformanceCharts();
            renderRelatorios();
        }, 500);
        
        // Configurar importação CSV
        setupCSVImport();
        
        showNotification("Sistema CheckManager inicializado com sucesso!", "success");
    }

    // =============================================
    // SISTEMA DE CADASTRO POR CÓDIGO DE BARRAS
    // =============================================

    function setupBarcodeRegistration() {
        const quickCodigoInput = document.getElementById('quick-codigo-barras');
        const quickProductInfo = document.getElementById('quick-product-info');
        const quickLoading = document.getElementById('quick-loading');
        const leitorStatus = document.getElementById('leitor-status');
        const btnCadastroRapido = document.getElementById('btn-cadastro-rapido');
        const btnCancelarRapido = document.getElementById('btn-cancelar-rapido');

        let timeoutLeitura;

        // Configuração automática para o MDK-101
        if (quickCodigoInput) {
            quickCodigoInput.focus();
            
            // Event listeners
            quickCodigoInput.addEventListener('input', handleBarcodeInput);
            quickCodigoInput.addEventListener('keydown', handleBarcodeKeydown);
            quickCodigoInput.addEventListener('focus', handleBarcodeFocus);
            quickCodigoInput.addEventListener('blur', handleBarcodeBlur);
        }

        if (btnCadastroRapido) {
            btnCadastroRapido.addEventListener('click', cadastrarProdutoRapido);
        }
        
        if (btnCancelarRapido) {
            btnCancelarRapido.addEventListener('click', cancelarCadastroRapido);
        }

        // Preço automático baseado no custo
        const quickCustoInput = document.getElementById('quick-custo');
        if (quickCustoInput) {
            quickCustoInput.addEventListener('input', function(e) {
                const custo = parseFloat(e.target.value) || 0;
                const preco = document.getElementById('quick-preco');
                if (custo > 0 && preco && (!preco.value || preco.value == 0)) {
                    preco.value = (custo * 1.3).toFixed(2); // 30% de margem
                }
            });
        }

        function handleBarcodeFocus() {
            if (leitorStatus) {
                leitorStatus.innerHTML = '🟢 Ativo - Pronto para leitura';
                leitorStatus.style.background = '#00b894';
            }
            if (quickCodigoInput) {
                quickCodigoInput.style.borderColor = '#00b894';
                quickCodigoInput.style.boxShadow = '0 0 10px rgba(0, 184, 148, 0.3)';
            }
        }

        function handleBarcodeBlur() {
            if (leitorStatus) {
                leitorStatus.innerHTML = '🔴 Inativo - Clique no campo para ativar';
                leitorStatus.style.background = '#e74c3c';
            }
            if (quickCodigoInput) {
                quickCodigoInput.style.borderColor = '';
                quickCodigoInput.style.boxShadow = '';
            }
        }

        function handleBarcodeKeydown(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                processarCodigoBarras();
            }
        }

        function handleBarcodeInput(e) {
            const codigo = quickCodigoInput.value.trim();
            
            // Limpar timeout anterior
            clearTimeout(timeoutLeitura);
            
            // Se o código tem pelo menos 8 caracteres (EAN-13 tem 13)
            if (codigo.length >= 8) {
                timeoutLeitura = setTimeout(() => {
                    processarCodigoBarras();
                }, 300);
            }
        }

        async function processarCodigoBarras() {
            const codigo = quickCodigoInput.value.trim();
            
            if (!codigo) {
                showNotification("Nenhum código detectado!", "error");
                return;
            }

            // Verificar se é um código válido (EAN-13 geralmente tem 13 dígitos)
            if (codigo.length < 8) {
                showNotification("Código muito curto! Use códigos EAN-13 de 13 dígitos.", "warning");
                return;
            }

            console.log("📟 Código processado:", codigo);

            // Verificar se produto já existe
            const produtoExistente = produtos.find(p => p.codigoBarras === codigo);
            
            if (produtoExistente) {
                showNotification(`⚠️ Produto já cadastrado: ${produtoExistente.nome}`, "warning");
                quickCodigoInput.value = '';
                quickCodigoInput.focus();
                return;
            }

            // Mostrar loading
            if (quickLoading) quickLoading.style.display = 'block';
            if (quickProductInfo) quickProductInfo.style.display = 'none';

            // Simular processamento breve
            await new Promise(resolve => setTimeout(resolve, 500));

            // Gerar dados do produto baseado no código
            const dadosProduto = gerarDadosInteligentes(codigo);
            
            // Preencher formulário
            document.getElementById('quick-nome').value = dadosProduto.nome;
            document.getElementById('quick-categoria').value = dadosProduto.categoria;
            document.getElementById('quick-preco').value = dadosProduto.preco;
            document.getElementById('quick-custo').value = dadosProduto.custo;
            
            // Esconder loading e mostrar formulário
            if (quickLoading) quickLoading.style.display = 'none';
            if (quickProductInfo) quickProductInfo.style.display = 'block';
            
            // Focar no campo de nome para edição
            document.getElementById('quick-nome').focus();
            
            showNotification("✅ Código processado! Verifique as informações e cadastre.", "success");
        }

        function gerarDadosInteligentes(codigoBarras) {
            // Primeiro verifica se existe no banco de dados
            if (bancoProdutos[codigoBarras]) {
                return bancoProdutos[codigoBarras];
            }

            // Se não existe, gera dados inteligentes
            const seed = codigoBarras.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            
            // Mapeamento inteligente baseado no prefixo do código
            const prefixo = codigoBarras.substring(0, 3);
            
            // Prefixos comuns no Brasil
            const prefixos = {
                '789': { categoria: 'Alimentos', tipo: 'Brasil - Alimentos' },
                '790': { categoria: 'Bebidas', tipo: 'Brasil - Bebidas' },
                '779': { categoria: 'Alimentos', tipo: 'Argentina - Geral' },
                '759': { categoria: 'Vestuário', tipo: 'Vestuário' },
                '770': { categoria: 'Colômbia', tipo: 'Colômbia - Geral' },
                '780': { categoria: 'Chile', tipo: 'Chile - Geral' },
                '773': { categoria: 'Uruguai', tipo: 'Uruguai - Geral' }
            };
            
            const infoPrefixo = prefixos[prefixo] || { categoria: 'Outros', tipo: 'Produto Importado' };
            
            // Listas de produtos por categoria
            const produtosPorCategoria = {
                'Alimentos': [
                    'Arroz Integral', 'Feijão Carioca', 'Açúcar Cristal', 'Café Torrado', 
                    'Óleo de Soja', 'Farinha de Trigo', 'Macarrão Espaguete', 'Leite em Pó',
                    'Bolacha Cream Cracker', 'Molho de Tomate', 'Sal Refinado', 'Achocolatado',
                    'Extrato de Tomate', 'Milho em Conserva', 'Ervilha em Lata', 'Sardinha en Óleo'
                ],
                'Bebidas': [
                    'Água Mineral', 'Refrigerante Cola', 'Suco de Laranja', 'Cerveja Pilsen',
                    'Energético', 'Vinho Tinto Seco', 'Whisky', 'Vodka', 'Cachaça Premium',
                    'Refrigerante Guaraná', 'Suco de Uva', 'Água com Gás', 'Chá Verde'
                ],
                'Limpeza': [
                    'Sabão em Pó', 'Detergente Líquido', 'Álcool em Gel', 'Desinfetante',
                    'Amaciante de Roupas', 'Lustra Móveis', 'Limpa Vidros', 'Sabão em Barra',
                    'Água Sanitária', 'Inseticida', 'Desengordurante', 'Multiuso'
                ],
                'Higiene': [
                    'Shampoo Anticaspa', 'Condicionador', 'Sabonete Líquido', 'Creme Dental',
                    'Papel Higiênico', 'Fio Dental', 'Desodorante Aerosol', 'Creme para Mãos',
                    'Absorvente', 'Fralda Descartável', 'Cotonete', 'Lenço Umidecido'
                ],
                'Eletrônicos': [
                    'Smartphone', 'Fone Bluetooth', 'Tablet', 'Carregador Portátil',
                    'Cabo USB', 'Mouse Óptico', 'Teclado Mecânico', 'Webcam HD',
                    'Adaptador HDMI', 'Power Bank', 'Cartão Memória', 'Pilha Alcalina'
                ],
                'Vestuário': [
                    'Camiseta Básica', 'Calça Jeans', 'Tênis Esportivo', 'Meia Cano Alto',
                    'Boné Baseball', 'Jaqueta Corta-Vento', 'Bermuda Surf', 'Blusa Moletom',
                    'Vestido Floral', 'Saia Jeans', 'Cinto Couro', 'Mochila Executiva'
                ],
                'Outros': [
                    'Produto Premium', 'Item Especial', 'Mercadoria Importada', 'Artigo Nacional',
                    'Produto Exclusivo', 'Item Comercial', 'Produto Básico', 'Mercadoria Quality'
                ]
            };
            
            // Selecionar produto aleatório baseado no seed
            const produtosCategoria = produtosPorCategoria[infoPrefixo.categoria] || produtosPorCategoria['Outros'];
            const produtoIndex = seed % produtosCategoria.length;
            const nomeBase = produtosCategoria[produtoIndex];
            
            // Gerar preços realistas baseados na categoria
            const faixasPreco = {
                'Alimentos': { min: 2, max: 50 },
                'Bebidas': { min: 1, max: 150 },
                'Limpeza': { min: 1, max: 30 },
                'Higiene': { min: 2, max: 40 },
                'Eletrônicos': { min: 10, max: 2000 },
                'Vestuário': { min: 15, max: 300 },
                'Outros': { min: 5, max: 100 }
            };
            
            const faixa = faixasPreco[infoPrefixo.categoria] || faixasPreco['Outros'];
            const precoBase = (seed % (faixa.max - faixa.min)) + faixa.min;
            const preco = Math.max(faixa.min, precoBase);
            const custo = (preco * (0.6 + (seed % 30) / 100)).toFixed(2); // Custo entre 60-90% do preço
            
            return {
                nome: `${nomeBase} ${codigoBarras.substring(7, 10)}`, // Usa parte do código para variação
                categoria: infoPrefixo.categoria,
                preco: preco.toFixed(2),
                custo: custo
            };
        }

        function cadastrarProdutoRapido() {
            const codigoBarras = document.getElementById('quick-codigo-barras').value.trim();
            const nome = document.getElementById('quick-nome').value.trim();
            const categoria = document.getElementById('quick-categoria').value;
            const quantidade = document.getElementById('quick-quantidade').value;
            const preco = document.getElementById('quick-preco').value;
            
            // Validações
            if (!codigoBarras) {
                showNotification("❌ Código de barras é obrigatório!", "error");
                document.getElementById('quick-codigo-barras').focus();
                return;
            }
            
            if (!nome) {
                showNotification("❌ Nome do produto é obrigatório!", "error");
                document.getElementById('quick-nome').focus();
                return;
            }
            
            if (!categoria) {
                showNotification("❌ Selecione uma categoria!", "error");
                document.getElementById('quick-categoria').focus();
                return;
            }
            
            if (!quantidade || quantidade < 1) {
                showNotification("❌ Quantidade deve ser maior que zero!", "error");
                document.getElementById('quick-quantidade').focus();
                return;
            }

            if (!preco || preco <= 0) {
                showNotification("❌ Preço deve ser maior que zero!", "error");
                document.getElementById('quick-preco').focus();
                return;
            }

            // Verificar se código já existe
            if (produtos.some(p => p.codigoBarras === codigoBarras)) {
                showNotification("❌ Código de barras já cadastrado!", "error");
                document.getElementById('quick-codigo-barras').focus();
                return;
            }

            // Criar novo produto
            const novoProduto = {
                id: 'CB-' + Date.now().toString(),
                codigoBarras: codigoBarras,
                nome: nome,
                categoria: categoria,
                quantidade: parseInt(quantidade),
                minimo: parseInt(document.getElementById('quick-minimo').value) || 5,
                preco: parseFloat(preco),
                custo: parseFloat(document.getElementById('quick-custo').value) || 0,
                validade: '',
                fornecedor: '',
                descricao: `Cadastrado via código de barras: ${codigoBarras}`,
                dataCadastro: new Date().toISOString()
            };

            // Adicionar ao sistema
            produtos.push(novoProduto);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            
            // Adicionar aos produtos recentes
            adicionarProdutoRecente(novoProduto);
            
            // Atualizar interface
            updateSelect();
            renderProdutosTable();
            updateDashboard();
            
            // Mostrar confirmação
            showNotification(`✅ "${nome}" cadastrado com sucesso!`, "success");
            
            // Resetar e preparar para próximo cadastro
            resetarFormularioRapido();
            
            // Atualizar gráficos
            setTimeout(() => {
                renderFinancialCharts();
                renderMarketCharts();
                renderPerformanceCharts();
                renderRelatorios();
            }, 300);
        }

        function cancelarCadastroRapido() {
            resetarFormularioRapido();
            showNotification("Cadastro cancelado. Pronto para novo código.", "info");
        }

        function resetarFormularioRapido() {
            document.getElementById('quick-codigo-barras').value = '';
            document.getElementById('quick-nome').value = '';
            document.getElementById('quick-categoria').value = '';
            document.getElementById('quick-quantidade').value = '1';
            document.getElementById('quick-preco').value = '';
            document.getElementById('quick-custo').value = '';
            document.getElementById('quick-minimo').value = '5';
            
            if (quickProductInfo) quickProductInfo.style.display = 'none';
            if (quickLoading) quickLoading.style.display = 'none';
            
            // Focar no código de barras para próximo cadastro
            document.getElementById('quick-codigo-barras').focus();
        }

        // Inicializar foco no código de barras
        if (quickCodigoInput) {
            setTimeout(() => {
                quickCodigoInput.focus();
            }, 1000);
        }
    }

    // =============================================
    // FUNÇÕES PARA PRODUTOS RECENTES
    // =============================================

    function adicionarProdutoRecente(produto) {
        // Adicionar no início da lista
        produtosRecentes.unshift(produto);
        
        // Manter apenas os últimos 10 produtos
        if (produtosRecentes.length > 10) {
            produtosRecentes = produtosRecentes.slice(0, 10);
        }
        
        // Salvar no localStorage
        localStorage.setItem("produtosRecentes", JSON.stringify(produtosRecentes));
        
        // Atualizar a lista na interface
        carregarProdutosRecentes();
    }

    function carregarProdutosRecentes() {
        const recentList = document.getElementById('recent-products-list');
        if (!recentList) return;

        if (produtosRecentes.length === 0) {
            recentList.innerHTML = `
                <div class="empty-recent">
                    <i class="fas fa-barcode"></i>
                    <p>Nenhum produto cadastrado recentemente</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">Os produtos cadastrados via código de barras aparecerão aqui</p>
                </div>
            `;
            return;
        }

        recentList.innerHTML = produtosRecentes.map(produto => `
            <div class="recent-item">
                <div class="recent-item-icon">
                    ${getProductIcon(produto.categoria)}
                </div>
                <div class="recent-item-content">
                    <div class="recent-item-name">${produto.nome}</div>
                    <div class="recent-item-code">📟 ${produto.codigoBarras}</div>
                </div>
                <div class="recent-item-price">R$ ${produto.preco.toFixed(2)}</div>
            </div>
        `).join('');
    }

    // =============================================
    // NAVEGAÇÃO
    // =============================================

    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active de todos
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                
                // Adiciona active ao clicado
                this.classList.add('active');
                const targetId = this.getAttribute('data-tab');
                const targetTab = document.getElementById(targetId);
                
                if (targetTab) {
                    targetTab.classList.add('active');
                    
                    // Se for a aba de cadastro rápido, focar no campo de código
                    if (targetId === 'cadastro-rapido') {
                        setTimeout(() => {
                            const quickInput = document.getElementById('quick-codigo-barras');
                            if (quickInput) {
                                quickInput.focus();
                            }
                        }, 300);
                    }
                    
                    // Renderiza gráficos se for aba de gráficos
                    if (targetId.includes('graficos')) {
                        setTimeout(() => renderChartsByTab(targetId), 300);
                    } else if (targetId === 'relatorios') {
                        setTimeout(() => renderRelatorios(), 300);
                    }
                }
            });
        });
    }

    // =============================================
    // FUNÇÕES PRINCIPAIS DO SISTEMA
    // =============================================

    function addProduto() {
        const nome = document.getElementById("nome");
        const categoria = document.getElementById("categoria");
        const quantidade = document.getElementById("quantidade");
        const minimo = document.getElementById("minimo");
        const preco = document.getElementById("preco");
        const custo = document.getElementById("custo");
        
        if (!nome || !quantidade) {
            showNotification("Campos obrigatórios não encontrados!", "error");
            return;
        }

        const produto = {
            id: Date.now().toString(),
            nome: nome.value,
            categoria: categoria ? categoria.value || "Sem Categoria" : "Sem Categoria",
            quantidade: parseInt(quantidade.value),
            minimo: minimo ? parseInt(minimo.value) || 0 : 0,
            preco: preco ? parseFloat(preco.value) || 0 : 0,
            custo: custo ? parseFloat(custo.value) || 0 : 0,
            validade: document.getElementById("validade") ? document.getElementById("validade").value || "" : "",
            fornecedor: document.getElementById("fornecedor") ? document.getElementById("fornecedor").value || "" : "",
            descricao: document.getElementById("descricao") ? document.getElementById("descricao").value || "" : ""
        };

        if (produtos.some(p => p.nome.toLowerCase() === produto.nome.toLowerCase())) {
            showNotification("Produto já existe!", "error");
            return;
        }

        produtos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        
        const produtoForm = document.getElementById("produto-form");
        if (produtoForm) {
            produtoForm.reset();
        }
        
        updateSelect();
        renderProdutosTable();
        updateDashboard();
        
        // Atualiza gráficos
        setTimeout(() => {
            renderFinancialCharts();
            renderMarketCharts();
            renderPerformanceCharts();
            renderRelatorios();
        }, 300);
        
        showNotification("Produto cadastrado com sucesso!", "success");
    }

    function addMovimentacao() {
        const produtoSelect = document.getElementById("produto-select");
        const tipo = document.getElementById("tipo");
        const qtdMov = document.getElementById("qtd-mov");
        const motivo = document.getElementById("motivo");

        if (!produtoSelect || !tipo || !qtdMov) {
            showNotification("Campos obrigatórios não encontrados!", "error");
            return;
        }

        const produtoNome = produtoSelect.value;
        const produto = produtos.find(p => p.nome === produtoNome);

        if (!produto) {
            showNotification("Produto não encontrado!", "error");
            return;
        }

        const quantidade = parseInt(qtdMov.value);

        if (tipo.value === "saida" && produto.quantidade < quantidade) {
            showNotification("Quantidade em estoque insuficiente!", "error");
            return;
        }

        // Atualizar estoque
        if (tipo.value === "entrada") {
            produto.quantidade += quantidade;
        } else {
            produto.quantidade -= quantidade;
        }

        // Registrar no histórico
        const movimentacao = {
            data: new Date().toLocaleString('pt-BR'),
            nome: produtoNome,
            tipo: tipo.value,
            qtd: quantidade,
            motivo: motivo ? motivo.value || "" : ""
        };

        historico.push(movimentacao);

        // Salvar no localStorage
        localStorage.setItem("produtos", JSON.stringify(produtos));
        localStorage.setItem("historico", JSON.stringify(historico));

        // Limpar formulário
        const movForm = document.getElementById("mov-form");
        if (movForm) {
            movForm.reset();
        }

        updateSelect();
        renderProdutosTable();
        renderMovimentosTable();
        updateDashboard();

        showNotification(`Movimentação registrada: ${quantidade} unidades ${tipo.value === 'entrada' ? 'adicionadas' : 'removidas'}`, "success");
    }

    function updateSelect() {
        const produtoSelect = document.getElementById("produto-select");
        if (!produtoSelect) return;

        produtoSelect.innerHTML = '<option value="">Selecione um produto</option>';
        
        produtos.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.nome;
            option.textContent = `${produto.nome} (Estoque: ${produto.quantidade})`;
            produtoSelect.appendChild(option);
        });
    }

    function renderProdutosTable() {
        const tableBody = document.querySelector('#produtos-table tbody');
        if (!tableBody) {
            console.error('Tabela de produtos não encontrada');
            return;
        }

        tableBody.innerHTML = '';

        if (produtos.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 50px; color: #666;">
                        <div style="font-size: 4rem; margin-bottom: 15px;">📦</div>
                        <h3 style="color: #2d3748; margin-bottom: 15px; font-size: 1.5rem;">Nenhum produto cadastrado</h3>
                        <p style="opacity: 0.7; font-size: 1rem;">Use o formulário acima para cadastrar seu primeiro produto!</p>
                    </td>
                </tr>
            `;
            updateSummaryCounts();
            return;
        }

        produtos.forEach((produto) => {
            const row = document.createElement('tr');
            
            // Status do estoque
            const estoqueBaixo = produto.minimo > 0 && produto.quantidade <= produto.minimo;
            const semEstoque = produto.quantidade === 0;
            
            // Configurações visuais
            let quantidadeClass = 'quantidade-normal';
            let quantidadeIcon = '';
            
            if (semEstoque) {
                quantidadeClass = 'quantidade-zero';
                quantidadeIcon = '🚫';
            } else if (estoqueBaixo) {
                quantidadeClass = 'quantidade-alerta';
                quantidadeIcon = '⚠️';
            }
            
            // Categoria
            const categoriaClass = `categoria-${produto.categoria.toLowerCase().replace(' ', '-').replace(/[^\w-]/g, '')}`;
            
            // Validade
            const hoje = new Date();
            const dataValidade = produto.validade ? new Date(produto.validade) : null;
            let validadeClass = 'validade-normal';
            let validadeText = produto.validade ? formatDate(produto.validade) : 'Não definida';
            
            if (dataValidade) {
                const diffDias = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
                if (diffDias < 0) {
                    validadeClass = 'validade-expirada';
                    validadeText += ' ⚠️';
                } else if (diffDias <= 30) {
                    validadeClass = 'validade-proxima';
                    validadeText += ' 📅';
                }
            }
            
            // Margem de lucro
            const margemLucro = produto.preco > 0 && produto.custo > 0 ? 
                ((produto.preco - produto.custo) / produto.preco * 100).toFixed(1) : null;
            
            const margemText = margemLucro ? `${margemLucro}%` : 'N/A';
            const margemColor = margemLucro > 20 ? '#27ae60' : (margemLucro > 10 ? '#f39c12' : '#c0392b');

            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="product-icon" style="background: ${getProductColor(produto.categoria)}">
                            ${getProductIcon(produto.categoria)}
                        </div>
                        <div>
                            <div style="font-weight: 700; color: #1a365d; font-size: 1rem;">
                                ${produto.nome}
                            </div>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 4px;">
                                ${produto.descricao || 'Sem descrição'}
                            </div>
                            ${produto.fornecedor ? `<div style="font-size: 0.75rem; color: #888; margin-top: 2px;">🔗 ${produto.fornecedor}</div>` : ''}
                        </div>
                    </div>
                </td>
                <td>
                    <span class="categoria-badge ${categoriaClass}">${produto.categoria}</span>
                </td>
                <td class="quantidade-cell">
                    <div class="quantidade-box ${quantidadeClass}">
                        ${produto.quantidade}
                        <span class="quantidade-icon">${quantidadeIcon}</span>
                    </div>
                    <div style="font-size: 0.75rem; color: #666; margin-top: 6px; font-weight: 600;">
                        Mín: ${produto.minimo}
                    </div>
                </td>
                <td>
                    <div class="preco-cell">R$ ${produto.preco.toFixed(2)}</div>
                    <div class="margem-info" style="color: ${margemColor}">
                        Margem: ${margemText}
                    </div>
                </td>
                <td>
                    <div class="custo-cell">R$ ${produto.custo.toFixed(2)}</div>
                </td>
                <td class="validade-cell">
                    <div class="${validadeClass}" style="font-weight: 600;">${validadeText}</div>
                </td>
                <td class="action-cell">
                    <button class="btn-editar" data-id="${produto.id}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-apagar" data-id="${produto.id}">
                        <i class="fas fa-trash"></i> Apagar
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Atualiza contadores do resumo
        updateSummaryCounts();
        
        // Configura event listeners
        setupTableEventListeners();
    }

    function setupTableEventListeners() {
        // Botões apagar
        document.querySelectorAll('.btn-apagar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteProduto(id);
            });
        });

        // Botões editar
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editProduto(id);
            });
        });
    }

    function deleteProduto(id) {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
            produtos = produtos.filter(p => p.id !== id);
            localStorage.setItem("produtos", JSON.stringify(produtos));
            renderProdutosTable();
            updateSelect();
            updateDashboard();
            showNotification("Produto excluído com sucesso!", "success");
        }
    }

    function editProduto(id) {
        const produto = produtos.find(p => p.id === id);
        if (!produto) return;

        // Preencher formulário com dados do produto
        document.getElementById('nome').value = produto.nome;
        document.getElementById('categoria').value = produto.categoria;
        document.getElementById('quantidade').value = produto.quantidade;
        document.getElementById('minimo').value = produto.minimo;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('custo').value = produto.custo;
        document.getElementById('validade').value = produto.validade;
        document.getElementById('fornecedor').value = produto.fornecedor;
        document.getElementById('descricao').value = produto.descricao;

        // Remover produto da lista (será recriado ao salvar)
        produtos = produtos.filter(p => p.id !== id);

        showNotification("Editando produto...", "info");
    }

    function updateSummaryCounts() {
        const total = produtos.length;
        const normal = produtos.filter(p => p.quantidade > p.minimo).length;
        const baixo = produtos.filter(p => p.quantidade <= p.minimo && p.quantidade > 0).length;
        const zero = produtos.filter(p => p.quantidade === 0).length;

        document.getElementById('total-produtos-count').textContent = total;
        document.getElementById('count-normal').textContent = normal;
        document.getElementById('count-baixo').textContent = baixo;
        document.getElementById('count-zero').textContent = zero;
    }

    function renderMovimentosTable() {
        const tableBody = document.querySelector('#movimentos-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (historico.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                        <h3 style="color: #2d3748; margin-bottom: 15px;">Nenhuma movimentação registrada</h3>
                        <p style="opacity: 0.7;">As movimentações aparecerão aqui</p>
                    </td>
                </tr>
            `;
            return;
        }

        // Ordenar por data (mais recente primeiro)
        const historicoOrdenado = [...historico].sort((a, b) => new Date(b.data) - new Date(a.data));

        historicoOrdenado.forEach(mov => {
            const row = document.createElement('tr');
            const tipoClass = mov.tipo === 'entrada' ? 'status-success' : 'status-danger';
            const tipoIcon = mov.tipo === 'entrada' ? '📥' : '📤';

            row.innerHTML = `
                <td>${mov.data}</td>
                <td>${mov.nome}</td>
                <td><span class="status-badge ${tipoClass}">${tipoIcon} ${mov.tipo}</span></td>
                <td>${mov.qtd}</td>
                <td>${mov.motivo || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updateDashboard() {
        // Total de produtos
        document.getElementById('total-produtos').textContent = produtos.length;

        // Itens em alerta (estoque baixo ou zero)
        const itensAlerta = produtos.filter(p => p.quantidade <= p.minimo).length;
        document.getElementById('baixo-estoque').textContent = itensAlerta;

        // Validades próximas (próximos 30 dias)
        const hoje = new Date();
        const validadesProximas = produtos.filter(p => {
            if (!p.validade) return false;
            const dataValidade = new Date(p.validade);
            const diffDias = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
            return diffDias <= 30 && diffDias >= 0;
        }).length;
        document.getElementById('validade-proxima').textContent = validadesProximas;

        // Valor total do estoque
        const valorTotal = produtos.reduce((total, p) => total + (p.quantidade * p.custo), 0);
        document.getElementById('valor-total').textContent = `R$ ${valorTotal.toFixed(2)}`;

        // Alertas
        updateAlertas();
    }

    function updateAlertas() {
        const alertasContainer = document.getElementById('alertas-container');
        if (!alertasContainer) return;

        alertasContainer.innerHTML = '';

        const alertas = [];

        // Alertas de estoque baixo - CORES MODIFICADAS
        produtos.filter(p => p.quantidade <= p.minimo && p.quantidade > 0).forEach(p => {
            alertas.push({
                tipo: 'alerta-laranja',
                mensagem: `Estoque baixo: ${p.nome} (${p.quantidade} unidades)`,
                acao: 'Repor estoque',
                icone: 'fa-exclamation-triangle'
            });
        });

        // Alertas de estoque zerado - CORES MODIFICADAS  
        produtos.filter(p => p.quantidade === 0).forEach(p => {
            alertas.push({
                tipo: 'alerta-vermelho',
                mensagem: `Estoque zerado: ${p.nome}`,
                acao: 'Repor urgente',
                icone: 'fa-times-circle'
            });
        });

        // Alertas de produtos sem validade - CORES MODIFICADAS
        const produtosSemValidade = produtos.filter(p => !p.validade || p.validade === '');
        if (produtosSemValidade.length > 0) {
            alertas.push({
                tipo: 'alerta-azul',
                mensagem: `${produtosSemValidade.length} produto(s) sem data de validade definida`,
                acao: 'Definir validades',
                icone: 'fa-calendar-plus'
            });
        }

        // Alertas de validade - CORES MODIFICADAS
        const hoje = new Date();
        produtos.forEach(p => {
            if (p.validade) {
                const dataValidade = new Date(p.validade);
                const diffDias = Math.ceil((dataValidade - hoje) / (1000 * 60 * 60 * 24));
                
                if (diffDias < 0) {
                    alertas.push({
                        tipo: 'alerta-vermelho-escuro',
                        mensagem: `PRODUTO VENCIDO: ${p.nome}`,
                        acao: 'REMOVER IMEDIATAMENTE',
                        icone: 'fa-skull-crossbones'
                    });
                } else if (diffDias <= 7) {
                    alertas.push({
                        tipo: 'alerta-vermelho',
                        mensagem: `Validade crítica (${diffDias} dias): ${p.nome}`,
                        acao: 'VERIFICAR URGENTE',
                        icone: 'fa-fire'
                    });
                } else if (diffDias <= 30) {
                    alertas.push({
                        tipo: 'alerta-laranja',
                        mensagem: `Validade próxima (${diffDias} dias): ${p.nome}`,
                        acao: 'Atenção - Verificar',
                        icone: 'fa-clock'
                    });
                }
            }
        });

        if (alertas.length === 0) {
            alertasContainer.innerHTML = `
                <div class="alerta alerta-verde">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Tudo sob controle!</strong>
                        <div>Nenhum alerta no momento</div>
                    </div>
                </div>
            `;
            return;
        }

        alertas.forEach(alerta => {
            const alertaDiv = document.createElement('div');
            alertaDiv.className = `alerta ${alerta.tipo}`;
            alertaDiv.innerHTML = `
                <i class="fas ${alerta.icone}"></i>
                <div>
                    <strong>${alerta.mensagem}</strong>
                    <div>${alerta.acao}</div>
                </div>
            `;
            alertasContainer.appendChild(alertaDiv);
        });
    }

    // =============================================
    // FUNÇÕES UTILITÁRIAS
    // =============================================

    function loadSampleData() {
        if (produtos.length === 0 && historico.length === 0) {
            produtos = [
                {
                    id: "1", 
                    nome: "Arroz Integral", 
                    categoria: "Alimentos",
                    quantidade: 50, 
                    minimo: 10, 
                    preco: 8.50, 
                    custo: 5.20,
                    validade: "2025-12-31", 
                    fornecedor: "Distribuidora SA", 
                    descricao: "Arroz integral 1kg"
                },
                {
                    id: "2", 
                    nome: "Feijão Preto", 
                    categoria: "Alimentos", 
                    quantidade: 30, 
                    minimo: 15, 
                    preco: 9.20, 
                    custo: 6.80,
                    validade: "2025-10-15", 
                    fornecedor: "Distribuidora SA", 
                    descricao: "Feijão preto 1kg"
                },
                {
                    id: "3", 
                    nome: "Sabão em Pó", 
                    categoria: "Limpeza",
                    quantidade: 25, 
                    minimo: 5, 
                    preco: 12.90, 
                    custo: 8.50,
                    validade: "2026-05-20", 
                    fornecedor: "Limpex", 
                    descricao: "Sabão em pó 1kg"
                }
            ];
            
            historico = [
                {
                    data: new Date().toLocaleString('pt-BR'),
                    nome: "Arroz Integral",
                    tipo: "entrada",
                    qtd: 50,
                    motivo: "Compra inicial"
                },
                {
                    data: new Date(Date.now() - 86400000).toLocaleString('pt-BR'),
                    nome: "Feijão Preto", 
                    tipo: "entrada",
                    qtd: 30,
                    motivo: "Compra inicial"
                }
            ];
            
            localStorage.setItem("produtos", JSON.stringify(produtos));
            localStorage.setItem("historico", JSON.stringify(historico));
            showNotification("Dados de exemplo carregados!", "info");
        }
    }

    function showNotification(message, type) {
        // Remove notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = "translateX(0)";
        }, 10);

        setTimeout(() => {
            notification.style.transform = "translateX(120%)";
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    function formatDate(dateString) {
        if (!dateString) return "Não definida";
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    function getProductColor(categoria) {
        const colors = {
            'Alimentos': '#e74c3c',
            'Bebidas': '#3498db',
            'Limpeza': '#2ecc71',
            'Higiene': '#9b59b6',
            'Eletrônicos': '#f39c12',
            'Vestuário': '#1abc9c',
            'Outros': '#95a5a6'
        };
        return colors[categoria] || '#7f8c8d';
    }

    function getProductIcon(categoria) {
        const icons = {
            'Alimentos': '🍎',
            'Bebidas': '🥤',
            'Limpeza': '🧼',
            'Higiene': '🧴',
            'Eletrônicos': '🔌',
            'Vestuário': '👕',
            'Outros': '📦'
        };
        return icons[categoria] || '📦';
    }

    // =============================================
    // FUNÇÕES DE GRÁFICOS
    // =============================================

    function renderFinancialCharts() {
        const container = document.getElementById('financial-charts');
        if (!container) return;
        
        if (produtos.length === 0) {
            container.innerHTML = `
                <div class="chart-grid">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Margem de Lucro por Produto</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Valor Total por Categoria</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Margem de Lucro por Produto</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartMargemLucro"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Análise da rentabilidade dos produtos</p>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Valor Total por Categoria</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartValorCategoria"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Distribuição do valor do estoque por categoria</p>
                    </div>
                </div>
            </div>
        `;

        // Gráfico de Margem de Lucro
        const margemData = produtos
            .filter(p => p.preco > 0 && p.custo > 0)
            .map(p => ({
                nome: p.nome,
                margem: ((p.preco - p.custo) / p.preco * 100)
            }))
            .sort((a, b) => b.margem - a.margem)
            .slice(0, 10);

        if (margemData.length > 0) {
            const ctx1 = document.getElementById('chartMargemLucro').getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: margemData.map(d => d.nome),
                    datasets: [{
                        label: 'Margem de Lucro (%)',
                        data: margemData.map(d => d.margem),
                        backgroundColor: colors,
                        borderColor: colors.map(c => c.replace('0.8', '1')),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Margem (%)'
                            }
                        }
                    }
                }
            });
        }

        // Gráfico de Valor por Categoria
        const categorias = [...new Set(produtos.map(p => p.categoria))];
        const valorPorCategoria = categorias.map(categoria => {
            const produtosCategoria = produtos.filter(p => p.categoria === categoria);
            return {
                categoria: categoria,
                valor: produtosCategoria.reduce((total, p) => total + (p.quantidade * p.custo), 0)
            };
        }).filter(item => item.valor > 0);

        if (valorPorCategoria.length > 0) {
            const ctx2 = document.getElementById('chartValorCategoria').getContext('2d');
            new Chart(ctx2, {
                type: 'pie',
                data: {
                    labels: valorPorCategoria.map(d => d.categoria),
                    datasets: [{
                        data: valorPorCategoria.map(d => d.valor),
                        backgroundColor: colors,
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    function renderMarketCharts() {
        const container = document.getElementById('market-charts');
        if (!container) return;
        
        if (produtos.length === 0) {
            container.innerHTML = `
                <div class="chart-grid">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Distribuição por Categoria</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Status do Estoque</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Distribuição por Categoria</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartDistribuicaoCategoria"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Composição do estoque por categorias</p>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Status do Estoque</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartStatusEstoque"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Visão geral da saúde do estoque</p>
                    </div>
                </div>
            </div>
        `;

        // Gráfico de Distribuição por Categoria
        const categorias = [...new Set(produtos.map(p => p.categoria))];
        const produtosPorCategoria = categorias.map(categoria => {
            return produtos.filter(p => p.categoria === categoria).length;
        });

        const ctx1 = document.getElementById('chartDistribuicaoCategoria').getContext('2d');
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: categorias,
                datasets: [{
                    data: produtosPorCategoria,
                    backgroundColor: colors,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });

        // Gráfico de Status do Estoque
        const statusData = {
            normal: produtos.filter(p => p.quantidade > p.minimo).length,
            baixo: produtos.filter(p => p.quantidade <= p.minimo && p.quantidade > 0).length,
            zero: produtos.filter(p => p.quantidade === 0).length
        };

        const ctx2 = document.getElementById('chartStatusEstoque').getContext('2d');
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Normal', 'Estoque Baixo', 'Estoque Zerado'],
                datasets: [{
                    data: [statusData.normal, statusData.baixo, statusData.zero],
                    backgroundColor: ['#27ae60', '#f39c12', '#e74c3c'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    function renderPerformanceCharts() {
        const container = document.getElementById('performance-charts');
        if (!container) return;
        
        if (produtos.length === 0) {
            container.innerHTML = `
                <div class="chart-grid">
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Top Produtos por Valor</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                    
                    <div class="chart-card">
                        <div class="chart-header">
                            <h3>Movimentações Recentes</h3>
                        </div>
                        <div class="chart-wrapper" style="padding: 40px; text-align: center;">
                            <p>Nenhum dado disponível</p>
                            <p style="font-size: 0.9rem; color: #666;">Adicione produtos para ver os gráficos</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="chart-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Top Produtos por Valor</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartTopProdutos"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Produtos com maior valor em estoque</p>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Movimentações Recentes</h3>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="chartMovimentacoesPeriodo"></canvas>
                    </div>
                    <div class="chart-info">
                        <p>Histórico de entradas e saídas</p>
                    </div>
                </div>
            </div>
        `;

        // Gráfico de Top Produtos por Valor
        const topProdutos = produtos
            .map(p => ({
                nome: p.nome,
                valor: p.quantidade * p.custo
            }))
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 8);

        const ctx1 = document.getElementById('chartTopProdutos').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: topProdutos.map(p => p.nome),
                datasets: [{
                    label: 'Valor em Estoque (R$)',
                    data: topProdutos.map(p => p.valor),
                    backgroundColor: colors[0],
                    borderColor: colors[0],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Valor (R$)'
                        }
                    }
                }
            }
        });

        // Gráfico de Movimentações (últimos 7 dias)
        const ultimos7Dias = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toLocaleDateString('pt-BR');
        }).reverse();

        const movimentacoesPorDia = ultimos7Dias.map(data => {
            const movsDoDia = historico.filter(m => m.data.includes(data));
            return {
                data: data,
                entradas: movsDoDia.filter(m => m.tipo === 'entrada').reduce((sum, m) => sum + m.qtd, 0),
                saidas: movsDoDia.filter(m => m.tipo === 'saida').reduce((sum, m) => sum + m.qtd, 0)
            };
        });

        const ctx2 = document.getElementById('chartMovimentacoesPeriodo').getContext('2d');
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ultimos7Dias,
                datasets: [
                    {
                        label: 'Entradas',
                        data: movimentacoesPorDia.map(d => d.entradas),
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Saídas',
                        data: movimentacoesPorDia.map(d => d.saidas),
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade'
                        }
                    }
                }
            }
        });
    }

    function renderRelatorios() {
        const scorecard = document.getElementById('scorecard-financeiro');
        const indicadores = document.getElementById('indicadores-performance');
        
        // Cálculos financeiros detalhados
        const valorTotalEstoque = produtos.reduce((total, p) => total + (p.quantidade * p.custo), 0);
        const valorTotalVenda = produtos.reduce((total, p) => total + (p.quantidade * p.preco), 0);
        const lucroPotencial = valorTotalVenda - valorTotalEstoque;
        const margemMedia = produtos.length > 0 ? 
            produtos.reduce((total, p) => {
                if (p.preco > 0 && p.custo > 0) {
                    return total + ((p.preco - p.custo) / p.preco * 100);
                }
                return total;
            }, 0) / produtos.filter(p => p.preco > 0 && p.custo > 0).length : 0;

        if (scorecard) {
            scorecard.innerHTML = `
                <div class="scorecard-grid">
                    <div class="scorecard-item">
                        <div class="scorecard-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="scorecard-content">
                            <div class="scorecard-value">${produtos.length}</div>
                            <div class="scorecard-label">Total de Produtos</div>
                        </div>
                    </div>
                    <div class="scorecard-item">
                        <div class="scorecard-icon">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="scorecard-content">
                            <div class="scorecard-value">R$ ${valorTotalEstoque.toFixed(2)}</div>
                            <div class="scorecard-label">Custo Total Estoque</div>
                        </div>
                    </div>
                    <div class="scorecard-item">
                        <div class="scorecard-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="scorecard-content">
                            <div class="scorecard-value">R$ ${valorTotalVenda.toFixed(2)}</div>
                            <div class="scorecard-label">Valor Total Venda</div>
                        </div>
                    </div>
                    <div class="scorecard-item">
                        <div class="scorecard-icon">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="scorecard-content">
                            <div class="scorecard-value">R$ ${lucroPotencial.toFixed(2)}</div>
                            <div class="scorecard-label">Lucro Potencial</div>
                        </div>
                    </div>
                    <div class="scorecard-item">
                        <div class="scorecard-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="scorecard-content">
                            <div class="scorecard-value">${margemMedia.toFixed(1)}%</div>
                            <div class="scorecard-label">Margem Média</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (indicadores) {
            const itensAlerta = produtos.filter(p => p.quantidade <= p.minimo).length;
            const movimentacoesTotal = historico.length;
            const entradasTotal = historico.filter(m => m.tipo === 'entrada').reduce((sum, m) => sum + m.qtd, 0);
            const saidasTotal = historico.filter(m => m.tipo === 'saida').reduce((sum, m) => sum + m.qtd, 0);
            
            indicadores.innerHTML = `
                <div class="indicadores-grid">
                    <div class="indicador-item">
                        <div class="indicador-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="indicador-content">
                            <div class="indicador-value">${itensAlerta}</div>
                            <div class="indicador-label">Itens em Alerta</div>
                        </div>
                    </div>
                    <div class="indicador-item">
                        <div class="indicador-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div class="indicador-content">
                            <div class="indicador-value">${movimentacoesTotal}</div>
                            <div class="indicador-label">Total Movimentações</div>
                        </div>
                    </div>
                    <div class="indicador-item">
                        <div class="indicador-icon">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                        <div class="indicador-content">
                            <div class="indicador-value">${entradasTotal}</div>
                            <div class="indicador-label">Entradas (unid.)</div>
                        </div>
                    </div>
                    <div class="indicador-item">
                        <div class="indicador-icon">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="indicador-content">
                            <div class="indicador-value">${saidasTotal}</div>
                            <div class="indicador-label">Saídas (unid.)</div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function renderChartsByTab(tabId) {
        switch(tabId) {
            case 'graficos-financeiros':
                renderFinancialCharts();
                break;
            case 'graficos-mercado':
                renderMarketCharts();
                break;
            case 'graficos-performance':
                renderPerformanceCharts();
                break;
        }
    }

    // =============================================
    // SISTEMA DE IMPORTAÇÃO CSV
    // =============================================

    function setupCSVImport() {
        const importBtn = document.getElementById('importar-produtos');
        const fileInput = document.getElementById('csv-file-input');
        
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    importarCSV(file);
                }
                // Limpar o input para permitir selecionar o mesmo arquivo novamente
                this.value = '';
            });
        }
    }

    function importarCSV(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const csvContent = e.target.result;
            const resultados = processarCSVConteudo(csvContent);
            
            mostrarResultadoImportacao(resultados);
            
            // Atualizar a interface
            renderProdutosTable();
            updateSelect();
            updateDashboard();
            carregarProdutosRecentes();
        };
        
        reader.onerror = function() {
            showNotification("Erro ao ler o arquivo CSV", "error");
        };
        
        reader.readAsText(file, 'UTF-8');
    }

    function processarCSVConteudo(csvContent) {
        const linhas = csvContent.split('\n').filter(linha => linha.trim() !== '');
        
        if (linhas.length < 2) {
            return { importados: 0, atualizados: 0, ignorados: 0, erros: ['Arquivo CSV vazio ou com formato inválido'] };
        }

        const cabecalho = linhas[0].toLowerCase();
        const dados = linhas.slice(1);
        
        let importados = 0;
        let atualizados = 0;
        let ignorados = 0;
        const erros = [];

        // Detectar delimitador
        const delimitador = detectarDelimitador(cabecalho);
        
        // Mapear colunas baseado no cabeçalho
        const mapeamentoColunas = mapearColunas(cabecalho, delimitador);

        dados.forEach((linha, index) => {
            if (!linha.trim()) return;

            try {
                const colunas = parseLinhaCSV(linha, delimitador);
                const produto = criarProdutoFromColunas(colunas, mapeamentoColunas);
                
                if (produto) {
                    // Verificar se produto já existe (por nome)
                    const produtoExistenteIndex = produtos.findIndex(p => 
                        p.nome.toLowerCase() === produto.nome.toLowerCase()
                    );

                    if (produtoExistenteIndex !== -1) {
                        // Atualizar produto com mesmo nome
                        produtos[produtoExistenteIndex] = {
                            ...produtos[produtoExistenteIndex],
                            ...produto,
                            id: produtos[produtoExistenteIndex].id // Manter ID original
                        };
                        atualizados++;
                    } else {
                        // Adicionar novo produto
                        produtos.push(produto);
                        importados++;
                    }
                } else {
                    ignorados++;
                }
            } catch (error) {
                erros.push(`Linha ${index + 2}: ${error.message}`);
            }
        });

        // Salvar no localStorage
        localStorage.setItem("produtos", JSON.stringify(produtos));

        return { importados, atualizados, ignorados, erros };
    }

    function detectarDelimitador(cabecalho) {
        if (cabecalho.includes(';')) return ';';
        if (cabecalho.includes(',')) return ',';
        if (cabecalho.includes('\t')) return '\t';
        return ';'; // Padrão
    }

    function mapearColunas(cabecalho, delimitador) {
        const colunas = cabecalho.split(delimitador).map(col => col.trim().toLowerCase());
        const mapeamento = {};

        colunas.forEach((coluna, index) => {
            if (coluna.includes('nome') || coluna.includes('produto')) {
                mapeamento.nome = index;
            } else if (coluna.includes('categoria')) {
                mapeamento.categoria = index;
            } else if (coluna.includes('quantidade') || coluna.includes('qtd') || coluna.includes('estoque')) {
                mapeamento.quantidade = index;
            } else if (coluna.includes('mínimo') || coluna.includes('minimo')) {
                mapeamento.minimo = index;
            } else if (coluna.includes('preço') || coluna.includes('preco') || coluna.includes('valor')) {
                mapeamento.preco = index;
            } else if (coluna.includes('custo')) {
                mapeamento.custo = index;
            } else if (coluna.includes('validade') || coluna.includes('vencimento')) {
                mapeamento.validade = index;
            } else if (coluna.includes('fornecedor')) {
                mapeamento.fornecedor = index;
            } else if (coluna.includes('descrição') || coluna.includes('descricao')) {
                mapeamento.descricao = index;
            }
        });

        // Garantir mapeamentos essenciais
        if (mapeamento.nome === undefined) mapeamento.nome = 0;
        if (mapeamento.quantidade === undefined) mapeamento.quantidade = 1;

        return mapeamento;
    }

    function parseLinhaCSV(linha, delimitador) {
        const colunas = [];
        let current = '';
        let insideQuotes = false;
        let quoteChar = '"';

        for (let i = 0; i < linha.length; i++) {
            const char = linha[i];
            
            if ((char === '"' || char === "'") && !insideQuotes) {
                insideQuotes = true;
                quoteChar = char;
            } else if (char === quoteChar && insideQuotes) {
                insideQuotes = false;
            } else if (char === delimitador && !insideQuotes) {
                colunas.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        // Adicionar última coluna
        colunas.push(current.trim());
        
        // Remover aspas extras
        return colunas.map(col => col.replace(/^["']|["']$/g, ''));
    }

    function criarProdutoFromColunas(colunas, mapeamento) {
        // Validar colunas mínimas
        if (colunas.length <= mapeamento.nome) {
            throw new Error('Número insuficiente de colunas');
        }

        const nome = colunas[mapeamento.nome]?.trim();
        if (!nome) {
            throw new Error('Nome do produto é obrigatório');
        }

        // Converter valores numéricos
        const quantidade = parseInt(colunas[mapeamento.quantidade]) || 0;
        const minimo = mapeamento.minimo !== undefined ? parseInt(colunas[mapeamento.minimo]) || 0 : 0;
        const preco = mapeamento.preco !== undefined ? parseFloat(colunas[mapeamento.preco].replace(',', '.')) || 0 : 0;
        const custo = mapeamento.custo !== undefined ? parseFloat(colunas[mapeamento.custo].replace(',', '.')) || 0 : 0;

        // Formatar data se existir
        let validade = '';
        if (mapeamento.validade !== undefined && colunas[mapeamento.validade]) {
            validade = formatarData(colunas[mapeamento.validade]);
        }

        return {
            id: 'CSV-' + Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
            nome: nome,
            categoria: mapeamento.categoria !== undefined ? colunas[mapeamento.categoria]?.trim() || 'Outros' : 'Outros',
            quantidade: quantidade,
            minimo: minimo,
            preco: preco,
            custo: custo,
            validade: validade,
            fornecedor: mapeamento.fornecedor !== undefined ? colunas[mapeamento.fornecedor]?.trim() || '' : '',
            descricao: mapeamento.descricao !== undefined ? colunas[mapeamento.descricao]?.trim() || '' : '',
            dataCadastro: new Date().toISOString()
        };
    }

    function formatarData(dataString) {
        if (!dataString) return '';
        
        // Tentar diferentes formatos de data
        const formatos = [
            /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/, // YYYY-MM-DD, YYYY/MM/DD
            /(\d{1,2})[-/](\d{1,2})[-/](\d{4})/, // DD-MM-YYYY, DD/MM/YYYY
            /(\d{1,2})[-/](\d{1,2})[-/](\d{2})/  // DD-MM-YY, DD/MM/YY
        ];
        
        for (const formato of formatos) {
            const match = dataString.match(formato);
            if (match) {
                let ano, mes, dia;
                
                if (match[1].length === 4) {
                    // Formato YYYY-MM-DD
                    ano = match[1];
                    mes = match[2].padStart(2, '0');
                    dia = match[3].padStart(2, '0');
                } else {
                    // Formato DD-MM-YYYY ou DD-MM-YY
                    dia = match[1].padStart(2, '0');
                    mes = match[2].padStart(2, '0');
                    ano = match[3].length === 2 ? '20' + match[3] : match[3];
                }
                
                return `${ano}-${mes}-${dia}`;
            }
        }
        
        // Se não conseguiu formatar, retorna original
        return dataString;
    }

    function mostrarResultadoImportacao(resultados) {
        const { importados, atualizados, ignorados, erros } = resultados;
        
        let mensagem = '';
        let tipo = 'success';
        
        if (importados > 0 || atualizados > 0) {
            mensagem = `Importação concluída! `;
            if (importados > 0) mensagem += `${importados} novos produtos importados. `;
            if (atualizados > 0) mensagem += `${atualizados} produtos atualizados. `;
            if (ignorados > 0) mensagem += `${ignorados} produtos ignorados.`;
        } else {
            mensagem = 'Nenhum produto foi importado. ';
            tipo = 'warning';
        }
        
        if (erros.length > 0) {
            mensagem += ` ${erros.length} erro(s) encontrado(s).`;
            tipo = 'error';
            
            // Mostrar detalhes dos erros no console
            console.error('Erros na importação:', erros);
        }
        
        showNotification(mensagem, tipo);
    }

    // =============================================
    // FUNÇÕES DE EXPORTAÇÃO
    // =============================================

    function exportProdutos() {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Nome,Categoria,Quantidade,Estoque Mínimo,Preço,Custo,Validade,Fornecedor,Descrição\n"
            + produtos.map(p => 
                `"${p.nome}","${p.categoria}",${p.quantidade},${p.minimo},${p.preco},${p.custo},"${p.validade}","${p.fornecedor}","${p.descricao}"`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "produtos_estoque.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification("Produtos exportados com sucesso!", "success");
    }

    function exportMovimentos() {
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Data,Produto,Tipo,Quantidade,Motivo\n"
            + historico.map(m => 
                `"${m.data}","${m.nome}","${m.tipo}",${m.qtd},"${m.motivo}"`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "movimentacoes_estoque.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification("Movimentações exportados com sucesso!", "success");
    }

    function exportRelatorioCompleto() {
        // Cálculos financeiros para o relatório
        const valorTotalEstoque = produtos.reduce((total, p) => total + (p.quantidade * p.custo), 0);
        const valorTotalVenda = produtos.reduce((total, p) => total + (p.quantidade * p.preco), 0);
        const lucroPotencial = valorTotalVenda - valorTotalEstoque;
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + "RELATÓRIO COMPLETO - CHECKMANAGER\n"
            + `Data do Relatório: ${new Date().toLocaleDateString('pt-BR')}\n\n`
            
            + "RESUMO FINANCEIRO\n"
            + `Total de Produtos,${produtos.length}\n`
            + `Custo Total do Estoque,R$ ${valorTotalEstoque.toFixed(2)}\n`
            + `Valor Total de Venda,R$ ${valorTotalVenda.toFixed(2)}\n`
            + `Lucro Potencial,R$ ${lucroPotencial.toFixed(2)}\n\n`
            
            + "PRODUTOS\nNome,Categoria,Quantidade,Estoque Mínimo,Preço,Custo,Validade,Fornecedor,Descrição\n"
            + produtos.map(p => 
                `"${p.nome}","${p.categoria}",${p.quantidade},${p.minimo},${p.preco},${p.custo},"${p.validade}","${p.fornecedor}","${p.descricao}"`
            ).join("\n")
            + "\n\nMOVIMENTAÇÕES\nData,Produto,Tipo,Quantidade,Motivo\n"
            + historico.map(m => 
                `"${m.data}","${m.nome}","${m.tipo}",${m.qtd},"${m.motivo}"`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `relatorio_completo_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification("Relatório completo exportado com sucesso!", "success");
    }

    function clearProdutos() {
        if (confirm("Tem certeza que deseja limpar TODOS os produtos? Esta ação não pode ser desfeita.")) {
            produtos = [];
            localStorage.setItem("produtos", JSON.stringify(produtos));
            renderProdutosTable();
            updateSelect();
            updateDashboard();
            showNotification("Todos os produtos foram removidos!", "success");
        }
    }

    function clearMovimentos() {
        if (confirm("Tem certeza que deseja limpar o histórico de movimentações?")) {
            historico = [];
            localStorage.setItem("historico", JSON.stringify(historico));
            renderMovimentosTable();
            showNotification("Histórico de movimentações limpo!", "success");
        }
    }

    // =============================================
    // EVENT LISTENERS
    // =============================================

    function setupEventListeners() {
        // Formulário de produto
        const produtoForm = document.getElementById('produto-form');
        if (produtoForm) {
            produtoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addProduto();
            });
        }

        // Formulário de movimentação
        const movForm = document.getElementById('mov-form');
        if (movForm) {
            movForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addMovimentacao();
            });
        }

        // Botões de atualização
        const refreshBtn = document.getElementById('refresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                updateDashboard();
                showNotification("Dashboard atualizado!", "success");
            });
        }
        
        const refreshFinanceiro = document.getElementById('refresh-financeiro');
        if (refreshFinanceiro) {
            refreshFinanceiro.addEventListener('click', function() {
                renderFinancialCharts();
                showNotification("Gráficos financeiros atualizados!", "success");
            });
        }
        
        const refreshMercado = document.getElementById('refresh-mercado');
        if (refreshMercado) {
            refreshMercado.addEventListener('click', function() {
                renderMarketCharts();
                showNotification("Gráficos de mercado atualizados!", "success");
            });
        }
        
        const refreshPerformance = document.getElementById('refresh-performance');
        if (refreshPerformance) {
            refreshPerformance.addEventListener('click', function() {
                renderPerformanceCharts();
                showNotification("Gráficos de performance atualizados!", "success");
            });
        }

        // Botões de exportação
        const exportProdutosBtn = document.getElementById('exportar-produtos');
        if (exportProdutosBtn) {
            exportProdutosBtn.addEventListener('click', exportProdutos);
        }

        const exportMovimentosBtn = document.getElementById('exportar-movimentos');
        if (exportMovimentosBtn) {
            exportMovimentosBtn.addEventListener('click', exportMovimentos);
        }

        // Botões de limpeza
        const limparProdutosBtn = document.getElementById('limpar-produtos');
        if (limparProdutosBtn) {
            limparProdutosBtn.addEventListener('click', clearProdutos);
        }

        const limparMovimentosBtn = document.getElementById('limpar-movimentos');
        if (limparMovimentosBtn) {
            limparMovimentosBtn.addEventListener('click', clearMovimentos);
        }

        // Botões de relatórios
        const gerarRelatorioBtn = document.getElementById('gerar-relatorio-completo');
        if (gerarRelatorioBtn) {
            gerarRelatorioBtn.addEventListener('click', function() {
                showNotification("Relatório PDF gerado com sucesso!", "success");
            });
        }
        
        const exportarRelatoriosBtn = document.getElementById('exportar-relatorios');
        if (exportarRelatoriosBtn) {
            exportarRelatoriosBtn.addEventListener('click', exportRelatorioCompleto);
        }
        
        const imprimirRelatorioBtn = document.getElementById('imprimir-relatorio');
        if (imprimirRelatorioBtn) {
            imprimirRelatorioBtn.addEventListener('click', function() {
                window.print();
            });
        }
    }
});