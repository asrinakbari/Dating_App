using Dating_App.Data;
using Dating_App.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dating_App.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext context;

        public BuggyController(DataContext context)
        {
            this.context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            try
            {
                var thing = context.Users.Find("-1");

                if (thing == null) return NotFound();

                return Ok(thing);
            }
            catch (Exception ex)
            {
                return StatusCode(404,"");
            }

        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            try
            {
                var thing = context.Users.Find("-1");

                var thingToReturn = thing.ToString();

                return thingToReturn;
            }
            catch (Exception)
            {

                return StatusCode(500, "");
            }


        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }

    }
}
