using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microondas.Models
{
    public class Aquecimento
    {
        private string strProduto;
        private int intTempo;
        private int intPotencia;
        private int intTimer;
        private string strMensagemErro;
        private bool boolErro = false;

        public string Produto
        {
            get { return strProduto; }
            set { strProduto = value; }
        }

        public int Tempo
        {
            get { return intTempo; }
            set { intTempo = value; }
        }

        public int Timer
        {
            get { return intTimer; }
            set { intTimer = value; }
        }

        public int Potencia
        {
            get { return intPotencia; }
            set { intPotencia = value; }
        }

        public string MensagemErro
        {
            get { return strMensagemErro; }
            set { strMensagemErro = value; }
        }

        public bool Erro
        {
            get { return boolErro; }
            set { boolErro = value; }
        }
    }
}