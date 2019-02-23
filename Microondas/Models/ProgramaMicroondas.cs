using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace Microondas.App.Models
{
    public class ProgramaMicroondas
    {
        public string Nome { get; set; }
        public string Tempo { get; set; }
        public int Potencia { get; set; }
        public string Caracter { get; set; }
        public string Instrucao { get; set; }

        public ProgramaMicroondas(string nome, string tempo, int potencia, string caracter, string instrucao)
        {
            Nome = nome;
            Tempo = tempo;
            Potencia = potencia;
            Caracter = caracter;
            Instrucao = instrucao;
        }

    }
}
