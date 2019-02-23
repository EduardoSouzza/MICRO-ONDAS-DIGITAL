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
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        public JsonResult NovoPrograma(string nome, string tempo, string potencia, string caracter, string instrucao)
        {
            Boolean sucess = false;
            if (ModelState.IsValid)
            {
                sucess = CriarArquivo.Arquivo(nome, tempo, potencia, caracter, instrucao);
                if (sucess)
                {
                    ViewData["Message"] = "Cadastro realizado com sucesso!";

                }
            }
            return new JsonResult()
            {
                Data = new { result = sucess },
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        public ActionResult GetPrograma(int index)
        {
            return Json(LerArquivos.ListarProgramas[index], JsonRequestBehavior.AllowGet);
        }


        public ActionResult Iniciar()
        {
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Parar()
        {
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Pausar()
        {
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}
