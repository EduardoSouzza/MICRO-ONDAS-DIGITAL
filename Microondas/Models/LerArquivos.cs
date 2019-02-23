using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;

namespace Microondas.App.Models
{
    public static class LerArquivos
    {
        public static List<ProgramaMicroondas> ListarProgramas
        {
            get
            {
                var Linhas = new List<ProgramaMicroondas>();

                //var enderecoDoArquivo = "configuracao.txt";
                var enderecoDoArquivo = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "configuracao.txt");
                using (var fluxoDoArquivo = new FileStream(enderecoDoArquivo, FileMode.Open))
                using (var leitor = new StreamReader(fluxoDoArquivo))
                {
                    while (!leitor.EndOfStream)
                    {
                        var linha = leitor.ReadLine();
                        var programaMicroondas = FormatLine(linha);
                        Linhas.Add(programaMicroondas);
                    }
                }

                return Linhas;
            }
        }

        static ProgramaMicroondas FormatLine(string linha)
        {
            var campos = linha.Split('|');
            var nome = campos[0];
            var tempo = campos[1];
            var potencia = int.Parse(campos[2]);
            var caracter = campos[3];
            var instrucao = campos[4];

            var resultado = new ProgramaMicroondas(nome, tempo, potencia, caracter, instrucao);
            return resultado;
        }
    }
}
