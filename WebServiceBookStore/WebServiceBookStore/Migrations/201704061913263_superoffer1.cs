namespace WebServiceBookStore.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class superoffer1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "isSuperOffer", c => c.Boolean(nullable: false));
            DropColumn("dbo.TypeOfBooks", "isSuperOffer");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TypeOfBooks", "isSuperOffer", c => c.Boolean(nullable: false));
            DropColumn("dbo.Books", "isSuperOffer");
        }
    }
}
