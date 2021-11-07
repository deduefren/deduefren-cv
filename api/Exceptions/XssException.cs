using System;

namespace api.Exceptions
{

    [Serializable]
    public class XssException : Exception
    {
        public XssException() { }
        public XssException(string message) : base(message) { }
        public XssException(string message, Exception inner) : base(message, inner) { }
        protected XssException(
          System.Runtime.Serialization.SerializationInfo info,
          System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }
}
