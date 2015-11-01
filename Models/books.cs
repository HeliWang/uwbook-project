using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;

namespace uwbook_webapi.Models
{ // uwbook SqlPassword@
  // Server=tcp:k91qrsub6b.database.windows.net,1433;Database=uwbookA3TCgVacwK;User ID=uwbook@k91qrsub6b;Password=SqlPassword@;Trusted_Connection=False;Encrypt=True;Connection Timeout=30;

    public class Subject
    {
        [Key]
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
    }

    public class Seller
    {
        [Key]
        public int SellerID { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }
        public string Contact { get; set; }
        public string Post { get; set; }
        public int Hot { get; set; }
    }

    public class Books
    {
        public Books()
        {
            Sellers = new List<Seller>();
            Subjects = new List<Subject>();
        }
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string ISBN { get; set; }
        public string Author { get; set; }
        public string CoverURL { get; set; }
        public virtual List<Subject> Subjects { get; set; }
        public virtual List<Seller> Sellers { get; set; }
    }

}