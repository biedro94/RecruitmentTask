namespace WebServiceBookStore.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class superoffer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TypeOfBooks", "isSuperOffer", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TypeOfBooks", "isSuperOffer");
        }
    }
}
