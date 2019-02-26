using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Microondas.App.Models
{
    public class Programa
    {
        public string nome { get; set; }
        public string instrucao { get; set; }
        public string tempo { get; set; }
        public string potencia { get; set; }
        public string caracter { get; set; }
        public bool started { get; set; }
        public bool paused { get; set; }
        public bool finshed { get; set; }

        public string convertTimer(string texto)
        {
            var strMinutos = int.Parse(texto.Substring(0, texto.IndexOf(":")));
            var strSegundos = int.Parse(texto.Substring(texto.IndexOf(":") + 1));
            return ((strMinutos * 60) + strSegundos).ToString();
        }
    }
}