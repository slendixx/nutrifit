import {formatPassword} from "@/lib/formatting";
import httpMocks from 'node-mocks-http';
import routeHandler, { SignupData } from '@/pages/api/signup';
//Mock password formater method
jest.mock("@/lib/formatting",()=>{
  return {
    formatPassword:jest.fn()
  }
})
const API_URL = process.env.NEXT_PUBLIC_API_HOST + '/api/signup';

describe('on POST request', () => {
  it('returns 400 and a message on invalid email', () => {

    //provide no email
    const {
      req: req1,
      res: res1
    } = mockReqRes(
      'POST',
      {}
    );
    routeHandler(req1, res1);
    expect(res1.statusCode)
      .toBe(400);
    expect(res1._getJSONData())
      .toEqual({
        message: 'no email was provided'
      });

    //provide empty email
    const mockData = mockSignupData();
    const {
      req: req2,
      res: res2
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        email: ''
      }
    );
    routeHandler(req2, res2);
    expect(res2.statusCode)
      .toBe(400);
    expect(res2._getJSONData())
      .toEqual({
        message: 'email can\'t be empty'
      });

    //provide email longer than 100 chars long
    const {
      req: req3,
      res: res3
    } = mockReqRes('POST', {
      ...mockData,
      email: 'this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-this-email-is-way-too-long-'
    });
    routeHandler(req3, res3);
    expect(res3.statusCode)
      .toBe(400);
    expect(res3._getJSONData())
      .toEqual({
        message: 'email length must be less than or equal to 100 characters long'
      });

    //provide invalid email
    const {
      req: req4,
      res: res4
    } = mockReqRes('POST', {
      ...mockData,
      email: 'brendajacobs'
    });
    routeHandler(req4, res4);
    expect(res4.statusCode)
      .toBe(400);
    expect(res4._getJSONData())
      .toEqual({
        message: 'invalid email'
      });
  });
  it('returns 400 and a message on invalid first name', () => {
    const mockData = mockSignupData();
    //provide no first name
    const noFirstName = { ...mockData };
    delete noFirstName.firstName;
    const {
      req: req1,
      res: res1
    } = mockReqRes(
      'POST',
      noFirstName
    );
    routeHandler(req1, res1);
    expect(res1.statusCode)
      .toBe(400);
    expect(res1._getJSONData())
      .toEqual({
        message: 'no first name was provided'
      });

    //provide empty first name
    const {
      req: req2,
      res: res2
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        firstName: ''
      }
    );
    routeHandler(req2, res2);
    expect(res2.statusCode)
      .toBe(400);
    expect(res2._getJSONData())
      .toEqual({
        message: 'first name can\'t be empty'
      });

    //provide first name longer than 30 characters
    const {
      req: req3,
      res: res3
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        firstName: '-this-first-name-is-way-too-long-'
      }
    );
    routeHandler(req3, res3);
    expect(res3.statusCode)
      .toBe(400);
    expect(res3._getJSONData())
      .toEqual({
        message: 'first name length must be less than or equal to 30 characters long'
      });
  });
  it('returns 400 and a message on invalid last name', () => {
    const mockData = mockSignupData();
    //provide no first name
    const noLastName = { ...mockData };
    delete noLastName.lastName;
    const {
      req: req1,
      res: res1
    } = mockReqRes(
      'POST',
      noLastName
    );
    routeHandler(req1, res1);
    expect(res1.statusCode)
      .toBe(400);
    expect(res1._getJSONData())
      .toEqual({
        message: 'no last name was provided'
      });

    //provide empty last name
    const {
      req: req2,
      res: res2
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        lastName: ''
      }
    );
    routeHandler(req2, res2);
    expect(res2.statusCode)
      .toBe(400);
    expect(res2._getJSONData())
      .toEqual({
        message: 'last name can\'t be empty'
      });

    //provide first name longer than 30 characters
    const {
      req: req3,
      res: res3
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        lastName: '-this-last-name-is-way-too-long-'
      }
    );
    routeHandler(req3, res3);
    expect(res3.statusCode)
      .toBe(400);
    expect(res3._getJSONData())
      .toEqual({
        message: 'last name length must be less than or equal to 30 characters long'
      });
  });
  it('returns 400 and a message on invalid password', () => {
    const mockData = mockSignupData();
    //provide no password
    const noPassword = { ...mockData };
    delete noPassword.password;
    const {
      req: req1,
      res: res1
    } = mockReqRes(
      'POST',
      noPassword
    );
    routeHandler(req1, res1);
    expect(res1.statusCode)
      .toBe(400);
    expect(res1._getJSONData())
      .toEqual({
        message: 'no password was provided'
      });

    //provide empty password
    const {
      req: req2,
      res: res2
    } = mockReqRes(
      'POST',
      {
        ...mockData,
        password: ''
      }
    );
    routeHandler(req2, res2);
    expect(res2.statusCode)
      .toBe(400);
    expect(res2._getJSONData())
      .toEqual({
        message: 'password can\'t be empty'
      });
  });

  it('formats password properly',()=>{
    const formatPasswordMock = formatPassword as jest.MockedFunction<any>
    formatPasswordMock.mockImplementation(()=>{
      return new Array(256).join("");
    })
    const mockData = mockSignupData();
    const {
      req,
      res
    } = mockReqRes(
      'POST',
      mockData
    );
    routeHandler(req, res);
    expect(formatPasswordMock).toHaveBeenCalled();
    expect(formatPasswordMock).toHaveBeenCalledWith(mockData.password);
  });
  /*
  * REFORMAT ALL THIS CODE INTO A PROPER RESTFUL ROUTE
  * /api/nutritionists on POST
  * perhaps
  * */
  it("hashes password",()=>{
    expect(bcrypt.compare(hashedPassword, password)).toBe(true);
  })
  it.todo("creates new user")
});


function mockReqRes(method: 'POST' | 'GET', body: any) {
  return {
    req: httpMocks.createRequest({
      method,
      url: API_URL,
      body
    }),
    res: httpMocks.createResponse()
  };
}

function mockSignupData(): SignupData {
  return {
    email: 'brendajacobs@email.com',
    firstName: 'brenda',
    lastName: 'jacobs',
    password: 'brenda123'
  };
}
