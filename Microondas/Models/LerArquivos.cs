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
        public static List<Programa> ListarProgramas
        {
            get
            {
                var Linhas = new List<Programa>();

                var enderecoDoArquivo = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "configuracao.txt");
                using (var fluxoDoArquivo = new FileStream(enderecoDoArquivo, FileMode.Open))
                using (var leitor = new StreamReader(fluxoDoArquivo))
                {
                    while (!leitor.EndOfStream)
                    {
                        var linha = leitor.ReadLine();
                        if (linha != "")
                        {
                            var linhaFormatada = FormatLine(linha);
                            Linhas.Add(linhaFormatada);
                        }
                    }
                }

                return Linhas;
            }
        }

        public static Programa GetProgramaByName(String nome)
        {
            return ListarProgramas.FirstOrDefault(programa => programa.nome.Equals(nome));
        }

        static Programa FormatLine(string linha)
        {
            var campos = linha.Split('|');
            var nome = campos[0];
            var tempo = campos[1];
            var potencia = campos[2];
            var caracter = campos[3];
            var instrucao = campos[4];

            return new Programa()
            {
                nome = nome,
                tempo = tempo,
                potencia = potencia,
                caracter = caracter,
                instrucao = instrucao
            };
        }
    }
}
