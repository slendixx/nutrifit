import httpMocks from 'node-mocks-http';
import routeHandler, {SignupData} from '@/pages/api/signup';
//Mock password formatter method from formatting module
import {truncatePassword} from "@/lib/formatting";
import dbConnection from "@/config/dbConnection"

jest.mock("@/lib/formatting", () => {
  return {
    truncatePassword: jest.fn()
  }
})
const API_URL = process.env.NEXT_PUBLIC_API_HOST + '/api/signup';
//Mock bcrypt
import {hash} from "bcrypt";
import {RowDataPacket} from "mysql2";

jest.mock("bcrypt", () => {
  return {
    hash: jest.fn(),
    compare: jest.fn()
  }
})
const mockHashCost = 12;
const mockHashedPassword = "$2y$12$67UwCjQzHonQHH/V/rVOCOfhC/gO4S4wlv5WVHVtCN6PlqqC...rS";

beforeEach(() => {
  const mockTruncatePassword = truncatePassword as jest.MockedFunction<any>;
  mockTruncatePassword.mockReturnValue("brenda123");

  const mockCalculateHashCost = calculateHashCost as jest.MockedFunction<any>;
  mockCalculateHashCost.mockReturnValue(Promise.resolve(mockHashCost));

  const mockHash = hash as jest.MockedFunction<any>;
  mockHash.mockReturnValue(Promise.resolve(mockHashedPassword));
})

beforeAll(async () => {
  await dbConnection.query("SET FOREIGN_KEY_CHECKS = 0");
})
afterEach(async () => {
  jest.resetAllMocks();
  await dbConnection.query("TRUNCATE TABLE nutritionist;");
})
import {calculateHashCost} from "@/lib/security";

afterAll(async () => {
  await dbConnection.query("SET FOREIGN_KEY_CHECKS = 1");
})

jest.mock("@/lib/security", () => {
  return {
    calculateHashCost: jest.fn()
  }
})

describe('on POST request', () => {
  describe("invalid requests", () => {
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
      const noFirstName = {...mockData};
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
      const noLastName = {...mockData};
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
      const noPassword = {...mockData};
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
    it("returns 400 if account with the same email already exists", async () => {
      const mockData = mockSignupData();
      await dbConnection.query("INSERT INTO nutritionist (email,first_name,last_name,password) VALUES (?,?,?,?)", [mockData.email, mockData.firstName, mockData.lastName, mockData.password]);
      const {
        req,
        res
      } = mockReqRes(
        'POST',
        mockData
      );
      await routeHandler(req, res);

      expect(res.statusCode)
        .toBe(400);
      expect(res._getJSONData())
        .toEqual({
          message: 'duplicate email'
        });
    })
  })
  describe("valid requests", () => {


    it('password is properly formatted and hashed', async () => {
      const mockData = mockSignupData();
      const {
        req,
        res
      } = mockReqRes(
        'POST',
        mockData
      );
      await routeHandler(req, res);
      expect(truncatePassword).toHaveBeenCalledWith(mockData.password);
      expect(calculateHashCost).toHaveBeenCalled();
      expect(hash).toHaveBeenCalledWith(mockData.password, mockHashCost);
    });
    /*
    * TODO REFORMAT SIGNUP CODE INTO A PROPER RESTFUL ROUTE
    * /api/nutritionists on POST
    * perhaps
    * */
    it("returns 201 and creates new user ", async () => {
      const mockData = mockSignupData();
      const {
        req,
        res
      } = mockReqRes(
        'POST',
        mockData
      );

      await routeHandler(req, res);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData().message).toMatch(/nutritionist account created/i);

      const sql = "" +
        "SELECT " +
        "email, " +
        "first_name as firstName, " +
        "last_name as lastName, " +
        "password " +
        "FROM nutritionist " +
        "WHERE first_name = ?;"

      const [rows, _] = await dbConnection.query<RowDataPacket[]>(sql, mockData.firstName);
      expect(rows[0]).toMatchObject({
        email: mockData.email,
        firstName: mockData.firstName,
        lastName: mockData.lastName
      });
      expect(rows[0].password).toBe(mockHashedPassword);
    })
  })

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