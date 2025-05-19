# 🚀 Guia Rápido - Publicar no GitHub Pages

## Passo 1: Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `ia-osint-uaisint`
3. Deixe **Public**
4. **NÃO** marque "Initialize this repository with a README"
5. Clique em **Create repository**

## Passo 2: Enviar Código

```bash
# No terminal, dentro da pasta do projeto:
cd /home/anderson-henrique/Documentos/tcc_anderson/exemplos

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Fazer commit
git commit -m "Initial commit: IA & OSINT Project"

# Adicionar repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/ia-osint-uaisint.git

# Enviar código
git push -u origin main
```

## Passo 3: Deploy Automático

```bash
# Usar o script de deploy
./deploy.sh
```

## Passo 4: Configurar GitHub Pages

1. No GitHub, vá em **Settings** do seu repositório
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
4. Clique em **Save**

## Passo 5: Acessar o Site

Aguarde 5-10 minutos e acesse:
```
https://SEU_USUARIO.github.io/ia-osint-uaisint/
```

## 📁 Estrutura no GitHub Pages

```
Página Principal:    /
Apresentação:       /presentation.html
Site Completo:      /website.html
```

## 🔧 Problemas Comuns

### Site não aparece?
- Aguarde até 10 minutos
- Verifique se o branch gh-pages foi criado
- Confirme as configurações em Settings > Pages

### Imagens não carregam?
- Verifique se o caminho está correto
- Use caminhos relativos: `images/logo.png`

### Scripts não funcionam?
- Verifique o console do navegador (F12)
- Confirme que os arquivos JS foram incluídos

## 💡 Dicas

1. **Atualizações**: Para atualizar o site, faça as mudanças e rode `./deploy.sh`
2. **Domínio próprio**: Crie arquivo `CNAME` com seu domínio
3. **HTTPS**: GitHub Pages fornece HTTPS automaticamente

## 🎉 Pronto!

Seu projeto está online e acessível para todos!

---

**Precisa de ajuda?** Abra uma issue no repositório!