using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microondas.App.Models;

namespace Microondas.App.Controllers
{
    public class CadastroController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult NovoPrograma(Programa programa)
        {
            Boolean sucess = false;
            if (ModelState.IsValid)
            {
                sucess = CriarArquivo.Arquivo(programa.nome, programa.tempo, programa.potencia, programa.caracter, programa.instrucao);
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
    }
}
