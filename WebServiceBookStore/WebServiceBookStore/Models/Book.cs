using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebServiceBookStore.Models
{
    public class Book
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime publishedDate { get; set; }
        public double price { get; set; }
        public string author { get; set; }
        public string publishingHouse { get; set; }
        public bool isSuperOffer { get; set; }
        public virtual TypeOfBook TypeOfBook { get; set; }
    }
}