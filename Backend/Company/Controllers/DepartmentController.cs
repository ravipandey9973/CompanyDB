using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using Company.Models;


namespace Company.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select DepartmentId,DepartmentName from dbo.Department";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query,con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Department d)
        {
            try
            {
                string query = @"insert into dbo.Department values
                      (
                        '" + d.DepartmentName + @"'
                       )
                       ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "sucessfully added";
            }
            catch (Exception)
            {
                return "Failed to added";
            }
        }
        public string Put(Department d)
        {
            try
            {
                string query = @"update dbo.Department set 
                              DepartmentName = '" + d.DepartmentName + @"'
                           where DepartmentId = "+d.DepartmentId+@"";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "sucessfully updated";
            }
            catch (Exception ex)
            {
                return "Failed to update"+ex;
            }
        }
        public string Delete(int id)
        {
            try
            {
                string query = @"delete from dbo.Department 
                   where DepartmentId = " + id + " ";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "sucessfully deleted";
            }
            catch(Exception)
            {
                return " Failed to Delete";
            }
        }
    }
}
