using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Company.Models;
using Microsoft.Ajax.Utilities;
using System.Web;
using System.Globalization;

namespace Company.Controllers
{
    public class CompanyyController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select CompanyId,CompanyName, Department, convert(varchar(10),Establish,120) as Establish,Address,PhotoFileName from Dbo.Company";

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Companyy c)
        {
            try
            {
                string query = @"INSERT INTO dbo.Company (CompanyName, Department, Establish, Address, PhotoFileName)
                         VALUES (@CompanyName, @Department, @Establish, @Address, @PhotoFileName)";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.CommandType = CommandType.Text;

                    // Add parameters with proper data types
                    cmd.Parameters.AddWithValue("@CompanyName", c.CompanyName);
                    cmd.Parameters.AddWithValue("@Department", c.Department);

                    cmd.Parameters.AddWithValue("@Establish", c.Establish);

                    cmd.Parameters.AddWithValue("@Address", c.Address);
                    cmd.Parameters.AddWithValue("@PhotoFileName", c.PhotoFileName);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                return "Successfully Added";
            }
            catch (Exception ex)
            {
                return "Failed to Added: " + ex.Message;
            }
        }




        public string Put(Companyy c)
        {
            try
            {
                string query = @"update dbo.Company set

             CompanyName = '" + c.CompanyName + @"',
             Department = '" + c.Department + @"',
             Establish = '" + c.Establish + @"',
             Address = '"+c.Address+@"',
             PhotoFileName = '"+c.PhotoFileName+@"'
             where CompanyId = "+c.CompanyId+@"

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
                return "Successfully Update";
            }
            catch (Exception )
            {
                return "Failed to Update";
            }
        }
        public string Delete(int id)

        {
            try
            {
                string query = @"delete dbo.Company 
                 where CompanyId = " + id + "";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    da.Fill(table);
                }
                return "Successfully Deleted";
            }
            catch (Exception)
            {
                return "Failed to Delete" ;
            }

        }

        [Route ("api/Companyy/GetAllDepartmentNames")]
        [HttpGet]
        public HttpResponseMessage GetAllDepartmentNames()
        {
            string query = @"select DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["CompanyAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("api/Companyy/SaveFile")]
        public string SaveFile()
        {
            try
            {


                var httprequest = HttpContext.Current.Request;
                var postedfile = httprequest.Files[0];
                var filename = postedfile.FileName;
                var PhysicalPath = HttpContext.Current.Server.MapPath("~/Photo/" + filename);

                postedfile.SaveAs(PhysicalPath);
                return filename;
            }
            catch (Exception ex)
            {
                return "anonymous.png" + ex;
            }


        }
}
}
