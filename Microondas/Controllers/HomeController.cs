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
