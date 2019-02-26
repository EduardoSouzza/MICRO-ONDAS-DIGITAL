using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microondas.App.Models;

namespace Microondas.App.Controllers
{
    public class HomeController : Controller
    {
        public static Programa main = new Programa();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetPrograma(int index)
        {
            return Json(LerArquivos.ListarProgramas[index], JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Parar()
        {
            main = new Programa()
            {
                nome = "Aquecimento Rápido",
                instrucao = "Aquecimento com potência máxima, tome cuidado!",
                tempo = "120",
                potencia = "10",
                caracter = "."
            };

            return new JsonResult()
            {
                Data = new { result = main },
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        [HttpPost]
        public ActionResult Pausar(Programa programa)
        {
            main = programa;
            main.paused = true;
            return new JsonResult()
            {
                Data = new { result = main },
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        [HttpPost]
        public ActionResult IniciarPrograma(String nome)
        {
            main = LerArquivos.GetProgramaByName(nome);
            main.tempo = main.convertTimer(main.tempo);

            return this.Cozinhar(main);
        }

        public JsonResult InicioRapido()
        {
            Programa programa = new Programa
            {
                nome = "Aquecimento Rápido",
                tempo = "30",
                potencia = "8",
                caracter = "#"
            };

            this.Cozinhar(programa);
            return new JsonResult()
            {
                Data = new { result = programa },
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        [HttpPost]
        public JsonResult Cozinhar(Programa programa)
        {
            main = programa;
            if (main.potencia == null)
            {
                main.potencia = "10";
            }

            var tempo = int.Parse(main.tempo);
            var potencia = int.Parse(main.potencia);

            if (tempo < 1 || tempo > (2 * 60))
            {
                return new JsonResult()
                {
                    Data = new { invalid = true, result = "Tempo máximo 2 minutos" },
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }

            if (potencia < 1 || potencia > 10)
            {
                return new JsonResult()
                {
                    Data = new { invalid = true, result = " Ajuste a potência entre 1 e 10" },
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }

            main.tempo = tempo.ToString();
            main.potencia = potencia.ToString();
            main.started = true;

            return new JsonResult()
            {
                Data = new { result = main },
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

    }
}
