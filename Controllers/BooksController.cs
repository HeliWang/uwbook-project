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
using System.Diagnostics;
namespace uwbook_webapi.Controllers
{
    public class BooksController : ApiController
    {
        private uwbook_webapiContext db = new uwbook_webapiContext();

        // GET: api/Books
        public IEnumerable<Books> GetBooks()
        {
            List<Books> listOfBooks = new List<Books>();
            foreach (var Books in db.Books) listOfBooks.Add(Books);
            return listOfBooks;
        }

        // GET: api/Books/5
        [ResponseType(typeof(Books))]
        public IHttpActionResult GetBooks(int id)
        {
            Books books = db.Books.Find(id);
            if (books == null)
            {
                return NotFound();
            }

            return Ok(books);
        }

        //PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBooks(int id, Seller sellers)
        {
            Books books = db.Books.Find(id);
            if (books == null)
            {
                return NotFound();
            }

            db.Sellers.Add(sellers);
            books.Sellers.Add(sellers);

            db.SaveChanges();


            return StatusCode(HttpStatusCode.NoContent);
        }
        /*
        // PUT: api/Books/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBooks(int id, Books books)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != books.ID)
            {
                return BadRequest();
            }

            db.Entry(books).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooksExists(id))
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
        */
        // POST: api/Books
        [ResponseType(typeof(Books))]
        public IHttpActionResult PostBooks(Books books)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Books.Add(books);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = books.ID }, books);
        }



        // DELETE: api/Books/5
        [ResponseType(typeof(Books))]
        public IHttpActionResult DeleteBooks(int id)
        {
            Books books = db.Books.Find(id);
            if (books == null)
            {
                return NotFound();
            }
            var relatedsellers = books.Sellers.ToArray();
            // var relatedsellers = db.Sellers.Where(b => b.SellerID == id);
           
            foreach (Seller oneseller in relatedsellers) db.Sellers.Remove(oneseller);
            var relatedsubjects = books.Subjects.ToArray();
            //var relatedsubjects = db.Subjects.Where(b => b.BOOK_ == id);
            foreach (Subject onesubject in relatedsubjects) db.Subjects.Remove(onesubject);

            db.Books.Remove(books);
            try { db.SaveChanges(); } catch(Exception e) { Debug.WriteLine(e); }
           

            return Ok(books);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BooksExists(int id)
        {
            return db.Books.Count(e => e.ID == id) > 0;
        }
    }
}