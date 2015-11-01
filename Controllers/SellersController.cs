using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using uwbook_webapi.Models;

namespace uwbook_webapi.Controllers
{
    public class SellersController : ApiController
    {
        private uwbook_webapiContext db = new uwbook_webapiContext();

        [ResponseType(typeof(Seller))]
        public IHttpActionResult GetSeller(int id)
        {
            Seller seller = db.Sellers.Find(id);
            if (seller == null)
            {
                return NotFound();
            }
            seller.Hot++;

            db.SaveChanges();
            return Ok(seller);
        }

        /*
        // GET: api/Sellers
        public IQueryable<Seller> GetSellers()
        {
            return db.Sellers;
        }

        // GET: api/Sellers/5
        [ResponseType(typeof(Seller))]
        public IHttpActionResult GetSeller(int id)
        {
            Seller seller = db.Sellers.Find(id);
            if (seller == null)
            {
                return NotFound();
            }

            return Ok(seller);
        }

        // PUT: api/Sellers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSeller(int id, Seller seller)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != seller.SellerID)
            {
                return BadRequest();
            }

            db.Entry(seller).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SellerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Sellers
        [ResponseType(typeof(Seller))]
        public IHttpActionResult PostSeller(Seller seller)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Sellers.Add(seller);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = seller.SellerID }, seller);
        }


        */
        // DELETE: api/Sellers/5
        [ResponseType(typeof(Seller))]
        public IHttpActionResult DeleteSeller(int id)
        {
            Seller seller = db.Sellers.Find(id);
            if (seller == null)
            {
                return NotFound();
            }

            db.Sellers.Remove(seller);
            db.SaveChanges();

            return Ok(seller);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SellerExists(int id)
        {
            return db.Sellers.Count(e => e.SellerID == id) > 0;
        }
    }
}