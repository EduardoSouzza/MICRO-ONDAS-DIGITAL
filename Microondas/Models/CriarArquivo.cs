using System;
using System.IO;
using System.Text;

namespace Microondas.App.Models
{

    public class CriarArquivo
    {

        public static Boolean Arquivo(string nome, string tempo, string potencia, string caracter, string instrucao)
        {

            try
            {
                var enderecoDoArquivo = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "configuracao.txt");
                using (var fluxoDeArquivo = new FileStream(enderecoDoArquivo, FileMode.Append))
                using (var escritor = new StreamWriter(fluxoDeArquivo, Encoding.UTF8))
                {
                    escritor.WriteLine(nome + "|" + tempo + "|" + potencia + "|" + caracter + "|" + instrucao, Environment.NewLine);
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
