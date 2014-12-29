using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExampleKendoExport
{
    class Program
    {
        static void Main(string[] args)
        {
            Process compiler = new Process();
            compiler.StartInfo.FileName = "phantomjs";
            compiler.StartInfo.Arguments = "phantomexport.js";
            compiler.StartInfo.CreateNoWindow = false;
            compiler.StartInfo.UseShellExecute = false;
            compiler.Start();
            Console.ReadLine();
        }
    }
}
