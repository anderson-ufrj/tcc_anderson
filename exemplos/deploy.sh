#!/bin/bash

# Deploy script para GitHub Pages
echo "🚀 Iniciando deploy para GitHub Pages..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está em um repositório git
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Este não é um repositório Git!${NC}"
    echo "Execute 'git init' primeiro."
    exit 1
fi

# Preparar estrutura para GitHub Pages
echo -e "${YELLOW}📁 Preparando estrutura de arquivos...${NC}"

# Criar diretório temporário para build
BUILD_DIR="gh-pages-build"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR

# Copiar arquivos HTML para raiz do build
cp src/pages/*.html $BUILD_DIR/

# Copiar recursos
mkdir -p $BUILD_DIR/images $BUILD_DIR/scripts
cp -r public/images/* $BUILD_DIR/images/ 2>/dev/null || true
cp -r src/scripts/* $BUILD_DIR/scripts/ 2>/dev/null || true

# Ajustar caminhos nos arquivos HTML
echo -e "${YELLOW}🔧 Ajustando caminhos...${NC}"
cd $BUILD_DIR
sed -i 's|../../public/images/|images/|g' *.html
sed -i 's|../scripts/|scripts/|g' *.html
cd ..

# Criar arquivo de configuração do GitHub Pages
cat > $BUILD_DIR/_config.yml << EOF
title: IA & OSINT - UAISINT
description: A Nova Fronteira Digital
baseurl: ""
url: ""
EOF

# Copiar README
cp README.md $BUILD_DIR/ 2>/dev/null || true

# Criar branch gh-pages se não existir
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo -e "${YELLOW}🌿 Criando branch gh-pages...${NC}"
    git checkout --orphan gh-pages
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout main
fi

# Mudar para branch gh-pages
echo -e "${YELLOW}🔄 Mudando para branch gh-pages...${NC}"
git checkout gh-pages

# Limpar branch gh-pages
rm -rf *

# Copiar arquivos do build
cp -r $BUILD_DIR/* .

# Adicionar e commitar mudanças
echo -e "${YELLOW}📝 Commitando mudanças...${NC}"
git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push para GitHub
echo -e "${YELLOW}📤 Enviando para GitHub...${NC}"
git push origin gh-pages

# Voltar para branch main
git checkout main

# Limpar diretório de build
rm -rf $BUILD_DIR

echo -e "${GREEN}✅ Deploy completo!${NC}"
echo ""
echo -e "${GREEN}🌐 Seu site estará disponível em alguns minutos em:${NC}"
echo -e "${YELLOW}https://[SEU-USUARIO].github.io/[NOME-DO-REPO]/${NC}"
echo ""
echo -e "${YELLOW}💡 Dicas:${NC}"
echo "1. Substitua [SEU-USUARIO] pelo seu nome de usuário do GitHub"
echo "2. Substitua [NOME-DO-REPO] pelo nome do seu repositório"
echo "3. Vá em Settings > Pages no seu repositório para verificar o status"
echo ""
echo -e "${GREEN}📋 Para configurar o GitHub Pages:${NC}"
echo "1. Vá em Settings > Pages no seu repositório"
echo "2. Em Source, selecione 'Deploy from a branch'"
echo "3. Em Branch, selecione 'gh-pages' e '/ (root)'"
echo "4. Clique em Save"